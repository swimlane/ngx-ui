import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPlaceholderComponent } from './card-placeholder.component';

describe('CardPlaceholderComponent', () => {
  let component: CardPlaceholderComponent;
  let fixture: ComponentFixture<CardPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPlaceholderComponent]
    });

    fixture = TestBed.createComponent(CardPlaceholderComponent);
    component = fixture.componentInstance;
  });

  it('initializes default placeholder', () => {
    const placeholder = fixture.debugElement.nativeElement;
    expect(placeholder).toBeDefined();
    expect(component.size).toEqual('medium');
  });
});
