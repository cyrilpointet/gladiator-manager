import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoStuffComponent } from './tuto-stuff.component';

describe('TutoStuffComponent', () => {
  let component: TutoStuffComponent;
  let fixture: ComponentFixture<TutoStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
