/**************************************************************************/
/*                                                                        */
/*  Game service :                                                        */
/*    -contains the general game variables                                */
/*    -contains the actual player variables                               */
/*    -contains global methods used in the game                           */
/*                                                                        */
/**************************************************************************/


import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './item';
import { Fighter } from './fighter';
import { Weapon } from './weapon';
import { Armor } from './armor';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

  //-------------------------------------------------------------------------------------
  // --------------------------- Game engine variables ----------------------------------
  //-------------------------------------------------------------------------------------

  fighterTypeList: object;
  weaponTypeList: object;
  armorTypeList: object;
  
  itemTypeList: object = {
    cure: {
      name: 'soin',
      image: 'cure.jpg',
      value: 30,
      type: 'cure'
    },
    totalCure: {
      name: 'soin complet',
      image: 'majorCure.jpg',
      value: 200,
      type: 'totalCure'
    },
    fireBall: {
      name: 'boule de feu',
      image: 'fireBall.jpg',
      value: 25,
      type: 'fireBall'
    }
  }

  //-------------------------------------------------------------------------------------
  // --------------------------- player variables ---------------------------------------
  //-------------------------------------------------------------------------------------

  
  team: Array<Fighter> = [];
  items: Array<Item> = [];
  weapons: Array<Weapon> = [];
  armors: Array<Armor> = [];
  money:number=1000;

  counterTeam: Array<Fighter> = [];

  get teamValue() {
    let teamValue:number=0;
    for (var index = 0; index < this.team.length; index++) {
      teamValue += this.team[index].value;
    }
    return teamValue;
  }

  get teamLevel(){
    let teamLevel:number=Math.ceil(this.teamValue/500);
    return teamLevel;
  }

  get counterTeamValue(){
    let teamValue:number=0;
    for (var index = 0; index < this.counterTeam.length; index++) {
      teamValue += this.counterTeam[index].value;
    }
    return teamValue;
  }

  //-------------------------------------------------------------------------------------
  // ---------------------------- General Methods ---------------------------------------
  //-------------------------------------------------------------------------------------

  // random fonction: Return a number beetween min and max

  rollDice(min, max) {
    let dice = max - min + 1;
    let result = Math.floor((Math.random() * dice) + min);
    return result;
  }

  // Create a new object of type: Fighter

  createFighter(type: string) {
    return new Fighter(this.fighterTypeList[type],this.weaponTypeList,this.armorTypeList);
  };

  // Ajax call: create objects for game engine. Called by app.component.ts on init

  loadList() {
    this.http.get('./assets/raceType.json')
      .subscribe(response => {
        this.fighterTypeList = response;
      });
    this.http.get('./assets/weaponType.json')
      .subscribe(response => {
        this.weaponTypeList = response;
      });
    this.http.get('./assets/armorType.json')
      .subscribe(response => {
        this.armorTypeList = response;
      });
  }

}



