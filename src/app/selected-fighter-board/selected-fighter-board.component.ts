import { Component, OnInit, Input } from '@angular/core';
import { Fighter } from '../fighter';

@Component({
  selector: 'app-selected-fighter-board',
  templateUrl: './selected-fighter-board.component.html',
  styleUrls: ['./selected-fighter-board.component.css']
})
export class SelectedFighterBoardComponent implements OnInit {

  constructor() { }

  @Input() fighter: Fighter;

  ngOnInit() {
  }

}
