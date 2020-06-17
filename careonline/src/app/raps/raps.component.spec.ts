import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapsComponent } from './raps.component';

describe('RapsComponent', () => {
  let component: RapsComponent;
  let fixture: ComponentFixture<RapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
