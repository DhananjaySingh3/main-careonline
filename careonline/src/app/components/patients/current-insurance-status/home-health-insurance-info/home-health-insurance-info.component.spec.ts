import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHealthInsuranceInfoComponent } from './home-health-insurance-info.component';

describe('HomeHealthInsuranceInfoComponent', () => {
  let component: HomeHealthInsuranceInfoComponent;
  let fixture: ComponentFixture<HomeHealthInsuranceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHealthInsuranceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHealthInsuranceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
