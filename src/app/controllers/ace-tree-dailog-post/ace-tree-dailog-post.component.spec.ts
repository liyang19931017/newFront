import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceTreeDailogPostComponent } from './ace-tree-dailog-post.component';

describe('AceTreeDailogPostComponent', () => {
  let component: AceTreeDailogPostComponent;
  let fixture: ComponentFixture<AceTreeDailogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceTreeDailogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceTreeDailogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
