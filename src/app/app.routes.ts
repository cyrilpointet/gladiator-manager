import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { StuffManagerComponent } from './stuff-manager/stuff-manager.component';
import { TutoMarketComponent } from './tuto-market/tuto-market.component';



export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'arena', component: ArenaComponent },
  { path: 'market', component: MarketComponent },
  { path: 'stuff', component: StuffManagerComponent },
  { path: 'tutomarket', component: TutoMarketComponent }
];