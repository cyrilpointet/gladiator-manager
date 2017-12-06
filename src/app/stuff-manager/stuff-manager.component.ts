import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';


import { GameService } from './../game.service';
import { Fighter } from './../fighter';
import { Weapon } from './../weapon';
import { Armor } from './../armor';
import { stringify } from '@angular/core/src/util';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-stuff-manager',
  templateUrl: './stuff-manager.component.html',
  styleUrls: ['./stuff-manager.component.scss'],
  animations: [
    trigger('toLeft', [
      transition('void => *', [
        animate('450ms', keyframes([
          style({ transform: 'translateX(-100vw)', offset: 0 }),
          style({ transform: 'translateX(5vw)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ]),
      transition('* => void', [
        animate('300ms', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(5vw)', offset: 0.2 }),
          style({ transform: 'translateX(-100vw)', offset: 1 })
        ]))
      ])
    ]),
    trigger('selectedFighterAnim', [
      transition('*=>*', [
        animate('250ms', keyframes([
          style({ transform: 'scale3d(1,1,1)', offset: 0 }),
          style({ transform: 'scale3d(0,1,1)', offset: 0.5 }),
          style({ transform: 'scale3d(1,1,1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('animState', [
      state('inactive', style({
        transform: 'scale(1)',
        border: 'solid rgba(255, 255, 255, 0.25) 0.25rem'
      })),
      state('stuffSelected', style({
        transform: 'scale(1.2)',
        border: 'solid rgba(5, 255, 118, 0.25) 0.25rem'
      })),
      transition('inactive <=> stuffSelected', animate('250ms'))
    ])
  ]
})
export class StuffManagerComponent implements OnInit {

  constructor(
    private game: GameService,
    private router: Router
  ) { }

  selectedFighter: number = 0;
  selectedFighterAnim: string = '';
  music:any;

  ngOnInit() {
    console.log('coucou stuff');
    this.game.isNoob = false;
    this.game.team[0].animState = 'stuffSelected';

    this.music = document.getElementById('music');
    this.music.loop=true;
    this.music.volume= 0.5;
    this.music.play();
  }

  ngOnDestroy() {
    this.game.team.forEach(fighter => {
      fighter.animState = 'inactive';
    });
  }

  selectMe(rank) {
    this.selectedFighter = rank;
    this.selectedFighterAnim = '' + this.selectedFighter;
    this.game.team.forEach(fighter => {
      fighter.animState = 'inactive';
    });
    this.game.team[rank].animState = 'stuffSelected';
  }

  dropWeapon() {
    if (this.game.team[this.selectedFighter].weapon.market) {
      this.game.weapons.push(this.game.team[this.selectedFighter].weapon);
      this.game.team[this.selectedFighter].weapon = new Weapon('unArmed', this.game.weaponTypeList);
      return true;
    }
  }

  dropArmor() {
    if (this.game.team[this.selectedFighter].armor.market) {
      this.game.armors.push(this.game.team[this.selectedFighter].armor);
      this.game.team[this.selectedFighter].armor = new Armor('noArmor', this.game.armorTypeList);
      return true;
    } else {
      return false;
    }
  }

  takeWeapon(rank) {
    if (this.dropWeapon() || this.game.team[this.selectedFighter].weapon.type == 'unArmed') {
      this.game.team[this.selectedFighter].weapon = this.game.weapons[rank];
      this.game.weapons.splice(rank, 1);
      let sound: any = document.getElementById('armor');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    }
  }

  takeArmor(rank) {
    if (this.dropArmor() || this.game.team[this.selectedFighter].armor.type == 'noArmor') {
      this.game.team[this.selectedFighter].armor = this.game.armors[rank];
      this.game.armors.splice(rank, 1);
      let sound: any = document.getElementById('armor');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    }
  }

  healMe() {
    if (this.game.team[this.selectedFighter].hp < this.game.team[this.selectedFighter].maxHp) {
      this.game.team[this.selectedFighter].hp += 10;
      if (this.game.team[this.selectedFighter].hp > this.game.team[this.selectedFighter].maxHp) {
        this.game.team[this.selectedFighter].hp = this.game.team[this.selectedFighter].maxHp
      }
      this.game.money -= 10;
      let sound: any = document.getElementById('buy');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    }
  }
  attackTrainig() {
    this.game.team[this.selectedFighter].attack += 5;
    this.game.money -= 5;
    let sound: any = document.getElementById('buy');
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
  defenseTrainig() {
    this.game.team[this.selectedFighter].defense += 5;
    this.game.money -= 5;
    let sound: any = document.getElementById('buy');
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }

  goHome() {
    this.router.navigate(['']);
  }
  goMarket() {
    this.router.navigate(['market']);
  }
  goArena() {
    this.router.navigate(['arena']);
  }
}
