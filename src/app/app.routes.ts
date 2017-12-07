import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { StuffManagerComponent } from './stuff-manager/stuff-manager.component';
import { TutoMarketComponent } from './tuto-market/tuto-market.component';
import { TutoStuffComponent } from './tuto-stuff/tuto-stuff.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { InfoComponent } from './info/info.component';




export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'arena', component: ArenaComponent },
  { path: 'market', component: MarketComponent },
  { path: 'stuff', component: StuffManagerComponent },
  { path: 'tutomarket', component: TutoMarketComponent },
  { path: 'tutoStuff', component: TutoStuffComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'teamSelection', component: TeamSelectionComponent },
  { path: 'info', component: InfoComponent }
];