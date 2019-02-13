import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceVersionSelectComponent } from './ace-version-select.component';

describe('AceVersionSelectComponent', () => {
  let component: AceVersionSelectComponent;
  let fixture: ComponentFixture<AceVersionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceVersionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceVersionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
