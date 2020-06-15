import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreauthHistoryformComponent } from './preauth-historyform.component';

describe('PreauthHistoryformComponent', () => {
  let component: PreauthHistoryformComponent;
  let fixture: ComponentFixture<PreauthHistoryformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreauthHistoryformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreauthHistoryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
