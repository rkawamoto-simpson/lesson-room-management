import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertApiComponent } from './alert-api.component';

describe('AlertApiComponent', () => {
  let component: AlertApiComponent;
  let fixture: ComponentFixture<AlertApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
