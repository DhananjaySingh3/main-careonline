import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreauthHistorylistComponent } from './preauth-historylist.component';

describe('PreauthHistorylistComponent', () => {
  let component: PreauthHistorylistComponent;
  let fixture: ComponentFixture<PreauthHistorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreauthHistorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreauthHistorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
