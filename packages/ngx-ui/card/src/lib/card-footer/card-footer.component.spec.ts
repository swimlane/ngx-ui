import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFooterComponent } from './card-footer.component';

describe('CardFooterComponent', () => {
  let component: CardFooterComponent;
  let fixture: ComponentFixture<CardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
