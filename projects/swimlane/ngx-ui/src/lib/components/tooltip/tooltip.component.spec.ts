import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTipFixtureComponent } from './fixtures/tooltip.fixture';
import { TooltipModule } from './tooltip.module';
import { TooltipDirective } from './tooltip.directive';

describe('TooltipContentComponent', () => {
  let directive: TooltipDirective;
  let fixture: ComponentFixture<ToolTipFixtureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolTipFixtureComponent],
      imports: [TooltipModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTipFixtureComponent);
    directive = fixture.componentInstance.tooltipDirective;
    fixture.autoDetectChanges();
  });

  it('can load instance', () => {
    expect(directive).toBeTruthy();
  });
});
