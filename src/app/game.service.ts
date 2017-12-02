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
import { Player } from './player';
import { parse } from 'url';

@Injectable()
export class GameService {
  constructor(
    private http: HttpClient
  ) { }

  //-------------------------------------------------------------------------------------
  // --------------------------- Game engine variables ----------------------------------
  //-------------------------------------------------------------------------------------

  fighterTypeList: object;
  weaponTypeList: object;
  armorTypeList: object;
  player: Player;

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

  name: string = 'Toto';
  isNoob = true;
  team: Array<Fighter> = [];
  items: Array<Item> = [];
  weapons: Array<Weapon> = [];
  armors: Array<Armor> = [];
  money: number = 1000;

  counterTeam: Array<Fighter> = [];

  get teamValue() {
    let teamValue: number = 0;
    for (var index = 0; index < this.team.length; index++) {
      teamValue += this.team[index].value;
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

  savePlayer() {
    // create Player object
    this.player = new Player(
      this.name,
      this.isNoob,
      this.team,
      this.items,
      this.weapons,
      this.armors,
      this.money
    );

    // convert player into string
    let playerSaved = 'player=' + JSON.stringify(this.player);

    // send player as string to server
    let req = new XMLHttpRequest();
    let gameservice = this;

    req.open("POST", './savePlayer.php');
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(playerSaved);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        gameservice.callbackSave(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + './savePlayer.php');
      }
    });
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + './savePlayer.php');
    });

  }

  loadPlayer(name) {
    let fileName = 'filename=' + name + '.txt';

    // send save filename to server
    let req = new XMLHttpRequest();
    let gameservice = this;

    req.open("POST", './loadPlayer.php');
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(fileName);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        gameservice.callbackload(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + './loadPlayer.php');
      }
    });
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + './loadPlayer.php');
    });
  }

  /***********************************/
  /* Ajax callabck from savePlayer() */
  /***********************************/
  callbackSave(reponse) {
    console.log('Saved: ' + reponse);
  }

  /***********************************/
  /* Ajax callabck from loadPlayer() */
  /***********************************/
  callbackload(reponse) {
    // Convert loaded string from API into object
    let loadedPLayer = JSON.parse(reponse);

    // copy string, boolean or number value to this (GameService)
    this.name = loadedPLayer.name;
    this.isNoob = loadedPLayer.isNoob;
    this.money = loadedPLayer.money;

    // create 'fighter' for each in loadedPLayer.team, copy values, then push to this.items
    this.team=[];
    if (loadedPLayer.team.length > 0) {
      for (let index = 0; index < loadedPLayer.team.length; index++) {
        const loadedFighter = new Fighter(loadedPLayer.team[index].archetype, this.weaponTypeList, this.armorTypeList);
        loadedFighter.name = loadedPLayer.team[index].name;
        loadedFighter.hp = loadedPLayer.team[index].hp;
        loadedFighter.attack = loadedPLayer.team[index].attack;
        loadedFighter.defense = loadedPLayer.team[index].defense;
        loadedFighter.weapon = new Weapon(loadedPLayer.team[index].weapon.type, this.weaponTypeList);
        loadedFighter.armor = new Armor(loadedPLayer.team[index].armor.type, this.armorTypeList);
        loadedFighter.xp = loadedPLayer.team[index].name;
        loadedFighter.victory = loadedPLayer.team[index].name;
        this.team.push(loadedFighter);
      }
    }

    // create 'item' for each in loadedPLayer.items, then push to this.items
    this.items=[];
    if (loadedPLayer.items.length > 0) {
      for (let index = 0; index < loadedPLayer.items.length; index++) {
        const loadedItem = new Item(loadedPLayer.items[index].itemType, this.itemTypeList);
        this.items.push(loadedItem);
      }
    }

    // create 'Weapon' for each in loadedPLayer.weapons, then push to this.weapons
    this.weapons=[];
    if (loadedPLayer.weapons.length > 0) {
      for (let index = 0; index < loadedPLayer.weapons.length; index++) {
        const loadedWeapon = new Weapon(loadedPLayer.weapons[index].type, this.weaponTypeList);
        this.weapons.push(loadedWeapon);
      }
    }

    // create 'Armor' for each in loadedPLayer.armors, then push to this.armors
    this.armors=[];
    if (loadedPLayer.armors.length > 0) {
      for (let index = 0; index < loadedPLayer.armors.length; index++) {
        const loadedArmor = new Armor(loadedPLayer.armors[index].type, this.armorTypeList);
        this.armors.push(loadedArmor);
      }
    }
  }
}



