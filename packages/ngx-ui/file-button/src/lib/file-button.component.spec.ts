import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileButtonComponent } from './file-button.component';

describe('FileButtonComponent', () => {
  let component: FileButtonComponent;
  let fixture: ComponentFixture<FileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
