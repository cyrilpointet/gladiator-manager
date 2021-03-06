import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from './../game.service';

import { Fighter } from './../fighter';
import { Weapon } from './../weapon';
import { Armor } from './../armor';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';


@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.scss'],
  animations: [
    trigger('animState', [
      state('inactive', style({
        transform: 'scale(1)',
        border: 'solid rgba(0, 0, 0, 0.25) 0.5rem'
      })),
      state('selected', style({
        transform: 'scale(1.1)',
        border: 'solid rgba(5, 200, 118, 0.5) 0.5rem'
      })),
      transition('inactive <=> stuffSelected', animate('250ms'))
    ])
  ]
})
export class TeamSelectionComponent implements OnInit {

  constructor(
    private router: Router,
    public game: GameService
  ) { }

  NbOfFightersInArena: number;
  music:any

  ngOnInit() {
    for (let index = 0; index < this.game.team.length; index++) {
      this.game.team[index].inArena = false;
      this.game.team[index].animState = 'inactive';
    }
    this.NbOfFightersInArena = 0;

    if (this.game.musicOnOff) {    
      this.music = document.getElementById('music');
      this.music.loop =true;
      this.music.volume= 0.5;
      this.music.play();
    }
  }

  inArena(rank) {
    if (this.NbOfFightersInArena < 4 && this.game.team[rank].inArena == false) {
      this.NbOfFightersInArena++;
      this.game.team[rank].inArena = true;
      this.game.team[rank].animState = 'selected';
      let sound:any = document.getElementById('sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    } else if (this.game.team[rank].inArena == true) {
      this.NbOfFightersInArena--;
      this.game.team[rank].inArena = false;
      this.game.team[rank].animState = 'inactive';
    }
  }

  goArena(){
    this.router.navigate(['arena']);
  }

  goHome(){
    this.router.navigate(['']);
  }

}
