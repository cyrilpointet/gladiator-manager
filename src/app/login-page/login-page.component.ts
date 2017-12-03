import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from './../game.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router,
    private game: GameService,
  ) { }

  ngOnInit() {
    console.log('coucou save');
  }

  load(){
    this.game.loadPlayer(this.game.name,this.game.password);
  }
  save(){
    this.game.savePlayer();
  }
}
