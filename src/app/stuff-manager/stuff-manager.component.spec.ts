import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffManagerComponent } from './stuff-manager.component';

describe('StuffManagerComponent', () => {
  let component: StuffManagerComponent;
  let fixture: ComponentFixture<StuffManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuffManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuffManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
