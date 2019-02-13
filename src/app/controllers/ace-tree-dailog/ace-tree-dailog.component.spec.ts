import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceTreeDailogComponent } from './ace-tree-dailog.component';

describe('AceTreeDailogComponent', () => {
  let component: AceTreeDailogComponent;
  let fixture: ComponentFixture<AceTreeDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceTreeDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceTreeDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
