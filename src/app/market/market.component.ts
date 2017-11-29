import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GameService } from './../game.service';
import { Fighter } from './../fighter';
import { Weapon } from './../weapon';
import { Armor } from './../armor';
import { Item } from '../item';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  constructor(
    private game: GameService,
    private router: Router
  ) { }

  availableFighters: Array<Fighter> = [];
  availableItems: Array<Item> = [];
  availableWeapons: Array<Weapon> = [];
  availableArmors: Array<Armor> = [];
  marketPlace='fighters'
  message: string = "Faites vos courses";

  ngOnInit() {
    console.log('coucou market');

    // Create a random list of fighters to put on the market

    let fighterArray: Array<string> = Object.keys(this.game.fighterTypeList);

    for (let index = 0; index < 10; index++) {
      let dice: number = this.game.rollDice(0, fighterArray.length - 1);
      let newFighterName: string = fighterArray[dice];
      let newFighter: Fighter = this.game.createFighter(newFighterName);
      if (newFighter.weapon.market) {
        newFighter.weapon=new Weapon('unArmed',this.game.weaponTypeList);
      }
      if (newFighter.armor.market) {
        newFighter.armor=new Armor('noArmor',this.game.armorTypeList);
      }
      this.availableFighters.push(newFighter);
    }

    // Create a list of available items on sale

    let itemArray: Array<string> = Object.keys(this.game.itemTypeList);
    itemArray.forEach(itemType => {
      let itemTemp: Item = new Item(itemType, this.game.itemTypeList);
      this.availableItems.push(itemTemp);
    });

    // Create a list of available weapons on sale
    let weaponArray: Array<string> = Object.keys(this.game.weaponTypeList);
    weaponArray.forEach(weaponType => {
      let weaponTemp: Weapon = new Weapon(weaponType, this.game.weaponTypeList);
      if (weaponTemp.market) { 
        this.availableWeapons.push(weaponTemp);
      }
    });

    // Create a list of available armors on sale
    let armorArray: Array<string> = Object.keys(this.game.armorTypeList);
    armorArray.forEach(armorType => {
      let armorTemp: Armor = new Armor(armorType, this.game.armorTypeList);
      if (armorTemp.market) { 
        this.availableArmors.push(armorTemp);
      }
    });

  }



  ngOnDestroy() {
    this.availableFighters = [];
  }

  showFighters(){
    this.marketPlace='fighters';
  }

  showItems(){
    this.marketPlace='items';
  }
  showWeapons(){
    this.marketPlace='weapons';
  }
  showArmors(){
    this.marketPlace='armors';
  }

  buyMe(fighter: Fighter, rank) {

    if (this.game.team.length > 3) {
      this.message = 'Votre équipe est déjà complète.';
      return;
    } else if (this.game.money < fighter.value) {
      this.message = 'Vous n\'avez pas assez d\'argent.';
    } else {
      this.game.money -= fighter.value;
      this.availableFighters.splice(rank, 1);
      this.game.team.push(fighter);
    }
  }

  buyWeapon(weapon: Weapon) {
    let buyedWeapon = new Weapon(weapon.type, this.game.weaponTypeList);
    if (this.game.money < buyedWeapon.value) {
      this.message = 'Vous n\'avez pas assez d\'argent.';
    } else if (this.game.weapons.length > 19) {
      this.message = 'Vous avez déjà assez d\'armes.';
    } else {
      this.game.weapons.push(buyedWeapon);
      this.game.money -= buyedWeapon.value;
    }
  }
  buyArmor(armor: Armor) {
    let buyedArmor = new Armor(armor.type, this.game.armorTypeList);
    if (this.game.money < buyedArmor.value) {
      this.message = 'Vous n\'avez pas assez d\'argent.';
    } else if (this.game.armors.length > 6) {
      this.message = 'Vous avez déjà assez d\'armures.';
    } else {
      this.game.armors.push(buyedArmor);
      this.game.money -= buyedArmor.value;
    }
  }

  buyItem(item: Item) {
    let buyedItem = new Item(item.type, this.game.itemTypeList);
    if (this.game.money < buyedItem.value) {
      this.message = 'Vous n\'avez pas assez d\'argent.';
    } else if (this.game.items.length > 3) {
      this.message = 'Vous avez déjà assez d\'objets.';
    } else {
      this.game.items.push(buyedItem);
      this.game.money -= buyedItem.value;
    }
  }

  sellMe(rank) {
    this.game.money += this.game.team[rank].value;
    this.availableFighters.push(this.game.team[rank]);
    this.game.team.splice(rank, 1);
  }

  sellWeapon(rank) {
    this.game.money += this.game.weapons[rank].value;
    this.game.weapons.splice(rank, 1);
  }

  sellArmor(rank) {
    this.game.money += this.game.armors[rank].value;
    this.game.armors.splice(rank, 1);
  }

  goBack() {
    this.router.navigate(['']);
  }
  goArena() {
    this.router.navigate(['arena']);
  }
  goStuff() {
    this.router.navigate(['stuff']);
  }
}
