import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAuthFormComponent } from './pre-auth-form.component';

describe('PreAuthFormComponent', () => {
  let component: PreAuthFormComponent;
  let fixture: ComponentFixture<PreAuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreAuthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
