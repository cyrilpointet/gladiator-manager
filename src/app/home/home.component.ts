import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from './../game.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public router: Router,
    public game: GameService,
  ) { }

  music:any;

  ngOnInit() {
    console.log('coucou home');
    this.game.autosave();

    this.music = document.getElementById('music');
    this.music.loop=true;
    this.music.volume= 0.5;
    if (this.game.musicOnOff) {
      this.music.play();
    }

  }

  musicOff(){
    this.game.musicOnOff=false;
    this.music.pause();
  }
  musicOn(){
    this.game.musicOnOff=true;
    this.music.play();
  }

  goArena() {
    this.router.navigate(['teamSelection']);
  }
  goMarket() {
    this.router.navigate(['market']);
  }
  goStuff() {
    this.router.navigate(['stuff']);
  }
  goTutoMarket() {
    this.router.navigate(['tutomarket']);
  }
  goTutoStuff() {
    this.router.navigate(['tutoStuff']);
  }
  goInfo() {
    this.router.navigate(['info']);
  }
}
