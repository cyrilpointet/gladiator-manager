import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFighterBoardComponent } from './selected-fighter-board.component';

describe('SelectedFighterBoardComponent', () => {
  let component: SelectedFighterBoardComponent;
  let fixture: ComponentFixture<SelectedFighterBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedFighterBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFighterBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
