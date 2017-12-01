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

  // Fullfill the 'player' object with all the player's variables

  savePlayer() {
    // initilise Player object
    this.player = new Player(
      this.name,
      this.isNoob,
      this.team,
      this.items,
      this.weapons,
      this.armors,
      this.money
    );

    console.log(this.player);

    // convert player into string
    let playerSaved = 'player=' + JSON.stringify(this.player);

    // send player-string to server
    ajaxPost('./savePlayer.php', playerSaved, callback);

    // ajax function
    function ajaxPost(url, datas, callback) {
      var req = new XMLHttpRequest();
      req.open("POST", url);
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(datas);
      req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
          // Appelle la fonction callback en lui passant la réponse de la requête
          callback(req.responseText);
        } else {
          console.error(req.status + " " + req.statusText + " " + url);
        }
      });
      req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
      });
    }

    // callback
    function callback(reponse) {
      console.log(reponse);
    }
  }

  loadPlayer(name) {
    let fileName=name+'.txt';
    let request:string='filename='+fileName;

    this.http.post('./loadPlayer.php',request)
    .subscribe(response => {
      console.log(response);
      console.log(this);
    });
  }
}



