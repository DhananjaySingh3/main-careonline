import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdgmComponent } from './pdgm.component';

describe('PdgmComponent', () => {
  let component: PdgmComponent;
  let fixture: ComponentFixture<PdgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
