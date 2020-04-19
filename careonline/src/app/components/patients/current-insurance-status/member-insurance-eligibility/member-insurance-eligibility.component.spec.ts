import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInsuranceEligibilityComponent } from './member-insurance-eligibility.component';

describe('MemberInsuranceEligibilityComponent', () => {
  let component: MemberInsuranceEligibilityComponent;
  let fixture: ComponentFixture<MemberInsuranceEligibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberInsuranceEligibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberInsuranceEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
