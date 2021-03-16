import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NagComponent } from './nag.component';

describe('NagComponent', () => {
  let component: NagComponent;
  let fixture: ComponentFixture<NagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NagComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
