import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { Fighter } from '../fighter';


@Component({
  selector: 'app-fighter-board',
  templateUrl: 'fighter-board.component.html',
  styleUrls: ['fighter-board.component.css']
})
export class FighterBoardComponent {
  
  constructor(){
  }
  
  @Input() fighter: Fighter;
  @Input() rank: number;
  @Input() activeFighterIndex: number;

  @Output() clickOnFighter = new EventEmitter();

  ngOnInit() {
    if (this.rank == 0) {
      this.fighter.couleurfond = "green"
    } else {
      this.fighter.couleurfond = "white"
    }
  }

  ngOnChanges() {
    if (this.rank == this.activeFighterIndex) {
      this.fighter.couleurfond = "green"
    } else {
      this.fighter.couleurfond = "white"
    }
  }

  get hpOnMaxHp() {
    return `${(this.fighter.hp / this.fighter.maxHp) * 100}%`;
  }

  get hpGaugeColor() {
    let hue = `${(this.fighter.hp / this.fighter.maxHp) * 120}`
    return `hsl(${hue},100%,40%)`;
  }

  clickMeBoard() {
    this.clickOnFighter.emit(this);
  }
}
