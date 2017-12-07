import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ArenaComponent } from './arena/arena.component';
import { GameService } from './game.service';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { StuffManagerComponent } from './stuff-manager/stuff-manager.component';
import { TutoMarketComponent } from './tuto-market/tuto-market.component';
import { TutoStuffComponent } from './tuto-stuff/tuto-stuff.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ArenaComponent,
    HomeComponent,
    MarketComponent,
    StuffManagerComponent,
    TutoMarketComponent,
    TutoStuffComponent,
    LoginPageComponent,
    TeamSelectionComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
