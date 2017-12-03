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

  ngOnInit() {
    console.log('coucou home');
  }

  goArena() {
    this.router.navigate(['arena']);
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
  /*
  save(){
    this.router.navigate(['login']);
//    this.game.savePlayer();
  }
  */
  load(){
    this.router.navigate(['login']);
//    this.game.loadPlayer(this.game.name);
  }
}
