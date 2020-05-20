import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedDialogComponent } from './denied-dialog.component';

describe('DeniedDialogComponent', () => {
  let component: DeniedDialogComponent;
  let fixture: ComponentFixture<DeniedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
