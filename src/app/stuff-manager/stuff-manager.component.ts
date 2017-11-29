import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { GameService } from './../game.service';
import { Fighter } from './../fighter';
import { Weapon } from './../weapon';
import { Armor } from './../armor';

@Component({
  selector: 'app-stuff-manager',
  templateUrl: './stuff-manager.component.html',
  styleUrls: ['./stuff-manager.component.scss']
})
export class StuffManagerComponent implements OnInit {

  constructor(
    private game: GameService,
    private router: Router
  ) { }

  selectedFighter: number;

  ngOnInit() {
    console.log('coucou stuff');

    this.selectedFighter = 0;

  }

  selectMe(rank) {
    this.selectedFighter = rank;
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
    if (this.dropWeapon() || this.game.team[this.selectedFighter].weapon.type=='unArmed' ) {
      this.game.team[this.selectedFighter].weapon = this.game.weapons[rank];
    this.game.weapons.splice(rank, 1);
    }    
  }

  takeArmor(rank) {
    if (this.dropArmor() ||  this.game.team[this.selectedFighter].armor.type=='noArmor') {
      this.game.team[this.selectedFighter].armor = this.game.armors[rank];
      this.game.armors.splice(rank, 1);
    }
  }

  healMe() {
    this.game.team[this.selectedFighter].hp += 10;
    if (this.game.team[this.selectedFighter].hp > this.game.team[this.selectedFighter].maxHp) {
      this.game.team[this.selectedFighter].hp = this.game.team[this.selectedFighter].maxHp
    }
    this.game.money -= 10;
  }

  goHome() {
    this.router.navigate(['']);
  }
  goArena() {
    this.router.navigate(['arena']);
  }
}
