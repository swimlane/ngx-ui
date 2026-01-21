import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CardModule } from './card.module';
import { TooltipModule } from '../tooltip/tooltip.module';

import {
  CardBodyDirective,
  CardTagDirective,
  CardTitleDirective,
  CardSubtitleDirective,
  CardSectionDirective
} from './card';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardFooterComponent } from './card-footer.component';

const baseClass = 'ngx-card';

describe('Card', () => {
  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        CardHeaderComponent,
        CardFooterComponent,
        CardBodyDirective,
        CardTagDirective,
        CardTitleDirective,
        CardSubtitleDirective,
        CardSectionDirective
      ],
      imports: [CardModule, FormsModule, TooltipModule],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });

  it('Initializes default card', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const card = fixture.debugElement.nativeElement;
    expect(card).toBeDefined();
    expect(card.classList.contains(`${baseClass}`)).toBe(true);
    expect(card.classList.contains('ngx-card-vertical')).toBe(false);
    expect(card.classList.contains('disabled')).toBe(false);
    expect(card.classList.contains('flat')).toBe(false);
    expect(card.classList.contains('ngx-card-horizontal')).toBe(true);
    expect(component.selectable).toBe(false);
    expect(component.selected).toBe(false);
  });

  it('Initializes vertical card', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const card = fixture.debugElement.nativeElement;
    (component.orientation as any) = 'vertical';
    fixture.detectChanges();
    expect(card.classList.contains(`${baseClass}`)).toBe(true);
    expect(card.classList.contains('ngx-card-horizontal')).toBe(false);
    expect(card.classList.contains('ngx-card-vertical')).toBe(true);
  });

  it('Initializes card header', () => {
    const fixture = TestBed.createComponent(CardHeaderComponent);
    fixture.detectChanges();
    const header = fixture.debugElement.nativeElement;
    expect(header).toBeDefined();
    expect(header.classList.contains('ngx-card-header')).toBe(true);
  });

  it('Initializes card footer', () => {
    const fixture = TestBed.createComponent(CardFooterComponent);
    fixture.detectChanges();
    const footer = fixture.debugElement.nativeElement;
    expect(footer).toBeDefined();
    expect(footer.classList.contains('ngx-card-footer')).toBe(true);
  });

  describe('CardBodyDirective', () => {
    let directive: CardBodyDirective;
    beforeEach(() => {
      directive = new CardBodyDirective();
    });
    it('should be defined', () => {
      expect(directive).toBeDefined();
    });
  });

  describe('CardTagDirective', () => {
    let directive: CardTagDirective;
    beforeEach(() => {
      directive = new CardTagDirective();
    });
    it('should be defined', () => {
      expect(directive).toBeDefined();
    });
  });

  describe('CardTitleDirective', () => {
    let directive: CardTitleDirective;
    beforeEach(() => {
      directive = new CardTitleDirective();
    });
    it('should be defined', () => {
      expect(directive).toBeDefined();
    });
  });

  describe('CardSubtitleDirective', () => {
    let directive: CardSubtitleDirective;
    beforeEach(() => {
      directive = new CardSubtitleDirective();
    });
    it('should be defined', () => {
      expect(directive).toBeDefined();
    });
  });

  describe('CardSectionDirective', () => {
    let directive: CardSectionDirective;
    beforeEach(() => {
      directive = new CardSectionDirective();
    });
    it('should be defined', () => {
      expect(directive).toBeDefined();
    });
  });
});
