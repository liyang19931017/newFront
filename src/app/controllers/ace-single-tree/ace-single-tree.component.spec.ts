import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceSingleTreeComponent } from './ace-single-tree.component';

describe('AceSingleTreeComponent', () => {
  let component: AceSingleTreeComponent;
  let fixture: ComponentFixture<AceSingleTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceSingleTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceSingleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
