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
    expect(card).toHaveClass(`${baseClass}`);
    expect(card).not.toHaveClass('ngx-card-vertical');
    expect(card).not.toHaveClass('disabled');
    expect(card).not.toHaveClass('flat');
    expect(card).toHaveClass('ngx-card-horizontal');
    expect(component.selectable).toBeFalse();
    expect(component.selected).toBeFalse();
  });

  it('Initializes vertical card', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const card = fixture.debugElement.nativeElement;
    (component.orientation as any) = 'vertical';
    fixture.detectChanges();
    expect(card).toHaveClass(`${baseClass}`);
    expect(card).not.toHaveClass('ngx-card-horizontal');
    expect(card).toHaveClass('ngx-card-vertical');
  });

  it('Initializes card header', () => {
    const fixture = TestBed.createComponent(CardHeaderComponent);
    fixture.detectChanges();
    const header = fixture.debugElement.nativeElement;
    expect(header).toBeDefined();
    expect(header).toHaveClass('ngx-card-header');
  });

  it('Initializes card footer', () => {
    const fixture = TestBed.createComponent(CardFooterComponent);
    fixture.detectChanges();
    const footer = fixture.debugElement.nativeElement;
    expect(footer).toBeDefined();
    expect(footer).toHaveClass('ngx-card-footer');
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
