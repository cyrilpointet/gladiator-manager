/**************************************************************************/
/*                                                                        */
/*  App component:                                                        */
/*    -bootstraped component                                              */
/*    -display the router-outlet                                          */
/*    -on init: set the game engine variable by game.loadList() method    */
/*                                                                        */
/**************************************************************************/


import { Component, Output, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Fighter } from './fighter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private game: GameService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('coucou app');
    
    this.game.loadList();
    if (!this.game.isInit) {
      this.router.navigate(['']);
    }
    this.game.isInit=true;
  }

}
