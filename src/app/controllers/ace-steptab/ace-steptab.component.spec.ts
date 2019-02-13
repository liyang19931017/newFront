import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceSteptabComponent } from './ace-steptab.component';

describe('AceSteptabComponent', () => {
  let component: AceSteptabComponent;
  let fixture: ComponentFixture<AceSteptabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceSteptabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceSteptabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
