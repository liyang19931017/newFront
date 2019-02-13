import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImgTextComponent } from './upload-img-text.component';

describe('UploadImgTextComponent', () => {
  let component: UploadImgTextComponent;
  let fixture: ComponentFixture<UploadImgTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImgTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImgTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
