import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoMarketComponent } from './tuto-market.component';

describe('TutoMarketComponent', () => {
  let component: TutoMarketComponent;
  let fixture: ComponentFixture<TutoMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
