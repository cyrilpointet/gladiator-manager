import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FighterBoardComponent } from './fighter-board/fighter-board.component';
import { ItemComponent } from './item/item.component';
import { SelectedFighterBoardComponent } from './selected-fighter-board/selected-fighter-board.component';
import { ArenaComponent } from './arena/arena.component';

import { GameService } from './game.service';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { StuffManagerComponent } from './stuff-manager/stuff-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    FighterBoardComponent,
    ItemComponent,
    SelectedFighterBoardComponent,
    ArenaComponent,
    HomeComponent,
    MarketComponent,
    StuffManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
