import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tuto-market',
  templateUrl: './tuto-market.component.html',
  styleUrls: ['./tuto-market.component.scss']
})
export class TutoMarketComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goMarket() {
    this.router.navigate(['market']);
  }
}
