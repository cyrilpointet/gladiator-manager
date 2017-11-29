import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterBoardComponent } from './fighter-board.component';

describe('FighterBoardComponent', () => {
  let component: FighterBoardComponent;
  let fixture: ComponentFixture<FighterBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FighterBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FighterBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
