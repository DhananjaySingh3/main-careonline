import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreauthListComponent } from './preauth-list.component';

describe('PreauthListComponent', () => {
  let component: PreauthListComponent;
  let fixture: ComponentFixture<PreauthListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreauthListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreauthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
