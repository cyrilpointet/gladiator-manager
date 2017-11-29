import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  imageUrl:string;

  @Input() item:Item;
  @Input() rank:number;

  @Output() clickOnStuff = new EventEmitter();

  ngOnInit() {
    this.imageUrl='../assets/img/'+this.item.image;
  }

  clickMe(){
    this.clickOnStuff.emit(this);
  }
}

