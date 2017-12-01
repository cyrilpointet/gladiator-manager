import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tuto-stuff',
  templateUrl: './tuto-stuff.component.html',
  styleUrls: ['./tuto-stuff.component.scss']
})
export class TutoStuffComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goStuff() {
    this.router.navigate(['stuff']);
  }
}
