import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedModalResponseComponent } from './stacked-modal-response.component';

describe('StackedModalResponseComponent', () => {
  let component: StackedModalResponseComponent;
  let fixture: ComponentFixture<StackedModalResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedModalResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedModalResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
