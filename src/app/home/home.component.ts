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
    private router: Router,
    private game: GameService,
  ) { }

  music:any;

  ngOnInit() {
    console.log('coucou home');
    this.game.autosave();

    if (this.game.isNoob) {
      this.music = document.getElementById('music');
      this.music.volume= 0.5;
      this.music.play();
    }

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
 
  load(){
    this.router.navigate(['login']);
  }
}
