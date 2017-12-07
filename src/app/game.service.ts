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
import { Router } from '@angular/router';

import { Item } from './item';
import { Fighter } from './fighter';
import { Weapon } from './weapon';
import { Armor } from './armor';
import { Player } from './player';
import { parse } from 'url';

@Injectable()
export class GameService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //-------------------------------------------------------------------------------------
  // --------------------------- Game engine variables ----------------------------------
  //-------------------------------------------------------------------------------------

  fighterTypeList: object;
  weaponTypeList: object;
  armorTypeList: object;
  message: string = '';
  musicOnOff:boolean = true;

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
  isInit: boolean = false;

  //-------------------------------------------------------------------------------------
  // --------------------------- player variables ---------------------------------------
  //-------------------------------------------------------------------------------------

  name: string = '';
  password: string = '';
  isNoob = true;
  team: Array<Fighter> = [];
  items: Array<Item> = [];
  weapons: Array<Weapon> = [];
  armors: Array<Armor> = [];
  money: number = 750;

  counterTeam: Array<Fighter> = [];

  get teamValue() {
    let teamValue: number = 0;
    for (var index = 0; index < this.team.length; index++) {
      if (this.team[index].inArena) { 
        teamValue += this.team[index].value;
      }
    }
    return teamValue;
  }

  get teamLevel() {
    let teamLevel: number = Math.ceil(this.teamValue / 500);
    return teamLevel;
  }

  get counterTeamValue() {
    let teamValue: number = 0;
    for (var index = 0; index < this.counterTeam.length; index++) {
      teamValue += this.counterTeam[index].value;
    }
    return teamValue;
  }
  get counterTeamLevel() {
    let teamLevel: number = Math.ceil(this.counterTeamValue / 500);
    return teamLevel;
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
    return new Fighter(this.fighterTypeList[type], this.weaponTypeList, this.armorTypeList);
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

  //-------------------------------------------------------------------------------------
  // ---------------------------- Save and Load Methods ---------------------------------
  //-------------------------------------------------------------------------------------

  login() {
    // create Player object
    let player = {
      name: this.name,
      password: this.password,
      isNoob: this.isNoob,
      team: this.team,
      items: this.items,
      weapons: this.weapons,
      armors: this.armors,
      money: this.money
    };

    // convert player into string
    let playerSaved = 'saves='+JSON.stringify(player);

    // send player as string to server
    let req = new XMLHttpRequest();
    let gameservice = this;

    req.open("POST", './login.php');
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(playerSaved);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        gameservice.callbackLogin(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + './savePlayer.php');
      }
    });
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + './savePlayer.php');
    });

  }

  /***********************************/
  /*     Ajax callabck from login()  */
  /***********************************/
  callbackLogin(reponse) {
    if (reponse == 'error') {
      this.message = 'erreur de mot de passe';
      return;
    }
    if (reponse == 'save ok') {
      this.router.navigate(['']);
      return;
    }
    // Convert loaded string from API into object
    let loadedPLayer = JSON.parse(reponse);

    // copy string, boolean or number value to this (GameService)
    this.isNoob = loadedPLayer.isNoob;
    this.money = loadedPLayer.money;

    // create 'fighter' for each in loadedPLayer.team, copy values, then push to this.items
    this.team = [];
    if (loadedPLayer.team.length > 0) {
      for (let index = 0; index < loadedPLayer.team.length; index++) {
        const loadedFighter = new Fighter(loadedPLayer.team[index].archetype, this.weaponTypeList, this.armorTypeList);
        loadedFighter.name = loadedPLayer.team[index].name;
        loadedFighter.hp = loadedPLayer.team[index].hp;
        loadedFighter.attack = loadedPLayer.team[index].attack;
        loadedFighter.defense = loadedPLayer.team[index].defense;
        loadedFighter.weapon = new Weapon(loadedPLayer.team[index].weapon.type, this.weaponTypeList);
        loadedFighter.armor = new Armor(loadedPLayer.team[index].armor.type, this.armorTypeList);
        loadedFighter.xp = loadedPLayer.team[index].xp;
        loadedFighter.victory = loadedPLayer.team[index].victory;
        this.team.push(loadedFighter);
      }
    }

    // create 'item' for each in loadedPLayer.items, then push to this.items
    this.items = [];
    if (loadedPLayer.items.length > 0) {
      for (let index = 0; index < loadedPLayer.items.length; index++) {
        const loadedItem = new Item(loadedPLayer.items[index].itemType, this.itemTypeList);
        this.items.push(loadedItem);
      }
    }

    // create 'Weapon' for each in loadedPLayer.weapons, then push to this.weapons
    this.weapons = [];
    if (loadedPLayer.weapons.length > 0) {
      for (let index = 0; index < loadedPLayer.weapons.length; index++) {
        const loadedWeapon = new Weapon(loadedPLayer.weapons[index].type, this.weaponTypeList);
        this.weapons.push(loadedWeapon);
      }
    }

    // create 'Armor' for each in loadedPLayer.armors, then push to this.armors
    this.armors = [];
    if (loadedPLayer.armors.length > 0) {
      for (let index = 0; index < loadedPLayer.armors.length; index++) {
        const loadedArmor = new Armor(loadedPLayer.armors[index].type, this.armorTypeList);
        this.armors.push(loadedArmor);
      }
    }

    this.router.navigate(['']);
  }

  /***********************************/
  /*             autosave            */
  /***********************************/

  autosave(){
    // create Player object
    let player = {
      name: this.name,
      password: this.password,
      isNoob: this.isNoob,
      team: this.team,
      items: this.items,
      weapons: this.weapons,
      armors: this.armors,
      money: this.money
    };

    // convert player into string
    let playerSaved = 'saves='+JSON.stringify(player);

    // send player as string to server
    let req = new XMLHttpRequest();
    let gameservice = this;

    req.open("POST", './autosave.php');
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(playerSaved);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        gameservice.callbackAutosave(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + './savePlayer.php');
      }
    });
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + './savePlayer.php');
    });
  }

  /***********************************/
  /*    Ajax callabck from autosave  */
  /***********************************/
  callbackAutosave(reponse){
    if (reponse == 'saveok') {
      this.message = 'sauvegarde auto ok';
      return;
    }
  }
}



