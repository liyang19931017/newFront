import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceTableComponent } from './ace-table.component';

describe('AceTableComponent', () => {
  let component: AceTableComponent;
  let fixture: ComponentFixture<AceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
