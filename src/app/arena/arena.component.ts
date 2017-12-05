import { Component, Output, OnInit } from '@angular/core';
import { Fighter } from './../fighter';
import { Item } from './../item';
import { ItemComponent } from './../item/item.component';
import { GameService } from './../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arena',
  templateUrl: 'arena.component.html',
  styleUrls: ['arena.component.css']
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
  isplayerTurn: boolean = true;

  //-------------------------------------------------------------------------------------
  // ---------------------  test variables to be replaced           ---------------------
  //-------------------------------------------------------------------------------------

  ngOnInit() {
    console.log('coucou arena');

    // Create a random array of fighters
    
    let fighterArray: Array<string> = Object.keys(this.game.fighterTypeList);

    this.game.counterTeam=[];
   
    do {
      let dice: number = this.game.rollDice(0, fighterArray.length - 1);
      let newFighterName: string = fighterArray[dice];
      let newFighter: Fighter = this.game.createFighter(newFighterName);
      this.game.counterTeam.push(newFighter);
      if (this.game.counterTeam.length>4 || this.game.counterTeamValue>this.game.teamValue) {
        this.game.counterTeam.splice(0,1);
      }
    } while (this.game.counterTeamValue>this.game.teamValue || this.game.counterTeamValue<this.game.teamValue*0.75) ;

    this.activeFighterIndex=-1;
    do {
      // while active fighter is alive
      this.activeFighterIndex++;
      
      console.log(this.game.team[this.activeFighterIndex].inArena);
    } while (!(this.game.team[this.activeFighterIndex].isAlive && this.game.team[this.activeFighterIndex].inArena));
    this.message = ` Choisit la cible de ${this.game.team[this.activeFighterIndex].name}`

  }
  

  //-------------------------------------------------------------------------------------
  // ---------------------  methods reacting from chid event emitter---------------------
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
          if (!target.isAlive) {
            attacker.xp+=target.maxHp;
            attacker.victory+=1;
          }
        } else {
          this.message = `${attacker.name} a manqué ${this.game.counterTeam[rank].name}.`;
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
      this.nextTurn();
    }
  }

  passTurn() {
    this.nextTurn();
  }

  goBack() {
    
    let list:Array<Fighter>=[];
    this.game.team.forEach(function (fighter,index){
        if (fighter.isAlive) {
          list.push(fighter);
        }
    })
    this.game.team=list;
    this.game.counterTeam=[];
    this.router.navigate(['']);
  }

  //-------------------------------------------------------------------------------------
  // --------------------------- fight methods ------------------------------------------
  //-------------------------------------------------------------------------------------

  isSomeoneAlive(squad: Array<Fighter>) {
    let answer: boolean = false;
    for (let index = 0; index < squad.length; index++) {
      const element = squad[index];
      if (element.isAlive) {
        answer = true;
      }
    }
    return answer;
  }

  nextTurn() {
    if (!this.isSomeoneAlive(this.game.counterTeam)) {
      let cashGain: number = 0;
      for (let index = 0; index < this.game.counterTeam.length; index++) {
        cashGain += this.game.counterTeam[index].value;
      }
      this.game.money += cashGain;
      this.message = `Vous avez gagné ${cashGain} pièces d'or`;
      this.isplayerTurn = false;
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
    this.message = ` Choisit la cible de ${this.game.team[this.activeFighterIndex].name}`
  }

  opponentsAtack() {
    this.isplayerTurn = false;
    for (let index = 0; index < this.game.counterTeam.length; index++) {
      // timeout for animations
      setTimeout(() => {
        let attacker: Fighter = this.game.counterTeam[index];
        if (attacker.isAlive && this.isSomeoneAlive(this.game.team)) {
          let target = this.game.team[this.chooseTarget()];
          if (this.attacks(attacker, target)) {
            this.message = `${target.name} a été touche par ${attacker.name}.`;
          } else {
            this.message = `${target.name} a esquivé l'attaque.`;
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
