import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMenuComponent } from './plus-menu.component';

describe('PlusMenuComponent', () => {
  let component: PlusMenuComponent;
  let fixture: ComponentFixture<PlusMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlusMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
