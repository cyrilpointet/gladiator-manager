import { Component, Output, OnInit } from '@angular/core';
import { Fighter } from './../fighter';
import { Item } from './../item';
import { ItemComponent } from './../item/item.component';
import { GameService } from './../game.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-arena',
  templateUrl: 'arena.component.html',
  styleUrls: ['arena.component.scss'],
  animations: [
    trigger('animState', [
      state('inactive', style({
        transform: 'translateY(0)',
        border: 'solid rgb(228, 221, 208) 0.5rem'
      })),
      state('attacking', style({
        transform: 'translateY(-5rem)',
        border: 'solid rgb(79, 165, 118) 0.5rem'
      })),
      transition('inactive <=> attacking', animate('250ms')),
      transition('inactive => hurted',
        animate('400ms', keyframes([
          style({ border: 'solid red 0.5rem', transform: 'translate(0)', offset: 0 }),
          style({ transform: 'translate(-1rem)', offset: 0.25 }),
          style({ transform: 'translate(1rem)', offset: 0.5 }),
          style({ transform: 'translate(-1rem)', offset: 0.75 }),
          style({ border: 'solid rgb(228, 221, 208) 0.5rem', transform: 'translate(0)', offset: 1 })
        ]))
      ),
      transition('attacking => hurted',
        animate('400ms', keyframes([
          style({ border: 'solid red 0.5rem', transform: 'translate(0,-5rem)', offset: 0 }),
          style({ transform: 'translate(-1rem,-5rem)', offset: 0.25 }),
          style({ transform: 'translate(1rem,-5rem)', offset: 0.5 }),
          style({ transform: 'translate(-1rem,-5rem)', offset: 0.75 }),
          style({ border: 'solid rgb(79, 165, 118) 0.5rem', transform: 'translate(0,-5rem)', offset: 1 })
        ]))
      )
    ])
  ]
})
export class ArenaComponent {
  constructor(
    private game: GameService,
    private router: Router
  ) { }



  //-------------------------------------------------------------------------------------
  // -----------------------------------   variables   ----------------------------------
  //-------------------------------------------------------------------------------------

  activeFighterIndex: number = 0;
  message: string = `Choisit la cible de ${this.game.team[this.activeFighterIndex].name}`;
  endMessage: string;
  isplayerTurn: boolean = true;
  shout: any;
  die: any;
  introArena: any;
  missed: any;
  combatOver:boolean;
  music:any;

  //-------------------------------------------------------------------------------------
  // ---------------------  test variables to be replaced           ---------------------
  //-------------------------------------------------------------------------------------

  ngOnInit() {
    console.log('coucou arena');

    // Init variable
    this.combatOver=false;

    // Create a random array of fighters

    let fighterArray: Array<string> = Object.keys(this.game.fighterTypeList);

    this.game.counterTeam = [];

    while (this.game.counterTeamLevel < this.game.teamLevel) {

      let dice: number = this.game.rollDice(0, fighterArray.length - 1);
      let newFighterName: string = fighterArray[dice];
      let newFighter: Fighter = this.game.createFighter(newFighterName);
      this.game.counterTeam.push(newFighter);

      if (this.game.counterTeam.length > 4) {
        this.game.counterTeam.splice(this.game.counterTeam.length-1, 1);
      }
      
      if (this.game.counterTeamLevel > this.game.teamLevel) {
        this.game.counterTeam.splice(this.game.counterTeam.length-1, 1);
      }
    };

    // Reset animState for team fighter
    this.game.team.forEach(fighter => {
      fighter.animState = 'inactive';
    });
    
    // Prepare the first fighter
    this.activeFighterIndex = -1;
    do {
      // while active fighter is alive
      this.activeFighterIndex++;
    } while (!(this.game.team[this.activeFighterIndex].isAlive && this.game.team[this.activeFighterIndex].inArena));
    this.message = ` Choisit la cible de ${this.game.team[this.activeFighterIndex].name}`;
    this.game.team[this.activeFighterIndex].animState = 'attacking';

    // Sounds init
    this.shout = document.getElementById('shout');
    this.die = document.getElementById('die');
    this.missed = document.getElementById('missed');

    this.introArena = document.getElementById('introArena');
    this.introArena.pause();
    this.introArena.currentTime = 0;
    this.introArena.play();

    this.music = document.getElementById('music');
    this.music.volume= 0.5;
    this.music.play();
  }


  //-------------------------------------------------------------------------------------
  // --------------------------------  on click methods ---------------------------------
  //-------------------------------------------------------------------------------------


  clickOnOpponent(rank) {
    if (!this.isplayerTurn) {
      return;
    }
    if (!this.isSomeoneAlive(this.game.team)) {
      this.message = `Tous les gladiateurs sont morts`;
      return;
    }
    if (this.isSomeoneAlive(this.game.counterTeam)) {
      if (this.game.counterTeam[rank].isAlive) {
        let attacker: Fighter = this.game.team[this.activeFighterIndex];
        let target: Fighter = this.game.counterTeam[rank];

        if (this.attacks(attacker, target)) {
          this.message = `${attacker.name} a touché ${this.game.counterTeam[rank].name}.`;
          // sound and animation
          this.game.counterTeam[rank].animState = 'hurted';
          this.shout.pause();
          this.shout.currentTime = 0;
          this.shout.play();
          setTimeout(() => {
            this.game.counterTeam[rank].animState = 'inactive';
          }, 400);

          if (!target.isAlive) {
            this.die.pause();
            this.die.currentTime = 0;
            this.die.play();
            attacker.xp += target.maxHp;
            attacker.victory += 1;
          }
        } else {
          this.message = `${attacker.name} a manqué ${this.game.counterTeam[rank].name}.`;
          this.missed.pause();
          this.missed.currentTime = 0;
          this.missed.play();
        }
        // timeout to let animations end
        setTimeout(() => {
          this.nextTurn();
        }, 500);

      } else {
        this.message = `${this.game.counterTeam[rank].name} est déjà mort !`;
        return;
      }
    } else {
      this.message = `Tous les ennemis sont morts`;
      return;
    }

  }

  clickOnStuff(event) {
    if (!this.isSomeoneAlive(this.game.team)) {
      this.message = `Tous les gladiateurs sont morts`;
      return;
    };
    if (!this.isSomeoneAlive(this.game.counterTeam)) {
      this.message = `Tous les ennemis sont morts`;
      return;
    }
    if (event.item.doJob(this.game.team, this.game.counterTeam, this.activeFighterIndex)) {
      this.message = `${event.item.name} a été utilisé(e).`;
      this.game.items.splice(event.rank, 1);
      if (!this.isSomeoneAlive(this.game.counterTeam)) {
        let cashGain: number = 0;
        for (let index = 0; index < this.game.counterTeam.length; index++) {
          cashGain += this.game.counterTeam[index].value;
        }
        this.game.money += cashGain;
        this.endMessage = `Bravo ! Vous avez gagné ${cashGain} pièces d'or`;
        this.isplayerTurn = false;
        setTimeout(() => {
          this.introArena.pause();
          this.introArena.currentTime = 0;
          this.introArena.play();
          this.combatOver = true;
        }, 1000);
      }
      this.nextTurn();
    }
  }

  passTurn() {
    this.nextTurn();
  }

  goBack() {

    let list: Array<Fighter> = [];
    this.game.team.forEach(function (fighter, index) {
      if (fighter.isAlive) {
        list.push(fighter);
      }
    })
    this.game.team = list;
    this.game.counterTeam = [];
    this.router.navigate(['']);
  }

  //-------------------------------------------------------------------------------------
  // --------------------------- fight methods ------------------------------------------
  //-------------------------------------------------------------------------------------

  isSomeoneAlive(squad: Array<Fighter>) {
    let answer: boolean = false;
    for (let index = 0; index < squad.length; index++) {
      const element = squad[index];
      if (element.isAlive && element.inArena) {
        answer = true;
      }
    }
    return answer;
  }

  nextTurn() {
    this.game.team[this.activeFighterIndex].animState = 'inactive';
    if (!this.isSomeoneAlive(this.game.counterTeam)) {
      let cashGain: number = 0;
      for (let index = 0; index < this.game.counterTeam.length; index++) {
        cashGain += this.game.counterTeam[index].value;
      }
      this.game.money += cashGain;
      this.endMessage = `Bravo ! Vous avez gagné ${cashGain} pièces d'or`;
      this.isplayerTurn = false;
      setTimeout(() => {
        this.introArena.pause();
        this.introArena.currentTime = 0;
        this.introArena.play();
        this.combatOver = true;
      }, 1000);
      return
    }
    do {
      // while active fighter is alive
      this.activeFighterIndex++;
      // end of round ?
      if (this.activeFighterIndex == this.game.team.length) {
        // is one teammate still alive ?
        if (this.isSomeoneAlive(this.game.team)) {
          // opponents attack
          this.opponentsAtack();
        } else {
          this.message = "Tous vos gladiateurs sont morts";
          break;
        }
        this.activeFighterIndex = 0;
      }
    } while (!(this.game.team[this.activeFighterIndex].isAlive && this.game.team[this.activeFighterIndex].inArena));
    this.game.team[this.activeFighterIndex].animState = 'attacking'
    this.message = ` Choisit la cible de ${this.game.team[this.activeFighterIndex].name}`
  }

  opponentsAtack() {
    this.isplayerTurn = false;
    for (let index = 0; index < this.game.counterTeam.length; index++) {
      // timeout for animations
      setTimeout(() => {
        let attacker: Fighter = this.game.counterTeam[index];
        if (attacker.isAlive && this.isSomeoneAlive(this.game.team)) {
          let targetIndex: number = this.chooseTarget();
          let target = this.game.team[targetIndex];
          if (this.attacks(attacker, target)) {
            this.message = `${target.name} a été touche par ${attacker.name}.`;
            this.game.team[targetIndex].animState = 'hurted';
            // sound and animation
            this.shout.pause();
            this.shout.currentTime = 0;
            this.shout.play();
            if (!this.isSomeoneAlive(this.game.team)) {
              this.endMessage = `Ah ! Tous vos gladiateurs sont morts !`;
              this.isplayerTurn = false;
              setTimeout(() => {
                this.introArena.pause();
                this.introArena.currentTime = 0;
                this.introArena.play();
                this.combatOver = true;
              }, 1000);
            }

            setTimeout(() => {
              if (targetIndex == this.activeFighterIndex) {
                this.game.team[targetIndex].animState = 'attacking';
              } else {
                this.game.team[targetIndex].animState = 'inactive';
              }
            }, 400);
          } else {
            this.message = `${target.name} a esquivé l'attaque.`;
            this.missed.pause();
            this.missed.currentTime = 0;
            this.missed.play();
          }
        }
        if (!this.game.team[0].isAlive && this.isSomeoneAlive(this.game.team)) {
          this.activeFighterIndex = 0;
          this.nextTurn();
        }
      }, (index * 500) + 500);
      setTimeout(() => {
        this.isplayerTurn = true;
      }, this.game.counterTeam.length * 1000);
    }
  }

  chooseTarget() {
    let max = this.game.team.length - 1;
    let targetIndex: number;
    do {
      targetIndex = this.game.rollDice(0, max);
    } while (!(this.game.team[targetIndex].isAlive && this.game.team[targetIndex].inArena));
    return targetIndex;
  }

  attacks(attacker: Fighter, target: Fighter) {
    let dice = this.game.rollDice(1, 100);
    if (dice + attacker.attack > target.armorClass) {
      let damage = this.game.rollDice(attacker.weapon.minDamage, attacker.weapon.maxDamage);
      target.takeDamage(damage);
      return true;
    } else {
      return false;
    }
  }


}
