import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentInsuranceComponent } from './current-insurance.component';

describe('CurrentInsuranceComponent', () => {
  let component: CurrentInsuranceComponent;
  let fixture: ComponentFixture<CurrentInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
