import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPdfComponent } from './to-pdf.component';

describe('ToPdfComponent', () => {
  let component: ToPdfComponent;
  let fixture: ComponentFixture<ToPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
