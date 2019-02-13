import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGobackComponent } from './header-goback.component';

describe('HeaderGobackComponent', () => {
  let component: HeaderGobackComponent;
  let fixture: ComponentFixture<HeaderGobackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderGobackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGobackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
