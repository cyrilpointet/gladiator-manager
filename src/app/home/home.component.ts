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

  ngOnInit(){
    console.log('coucou home');
  }

  goArena(){
    this.router.navigate(['arena']);
  }
  goMarket() {
    this.router.navigate(['market']);
  }
  goStuff() {
    this.router.navigate(['stuff']);
  }

}
