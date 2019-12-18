import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolTipFixtureComponent } from './fixtures/tooltip.fixture';
import { TooltipModule } from './tooltip.module';
import { TooltipDirective } from './tooltip.directive';

describe('TooltipContentComponent', () => {
  let directive: TooltipDirective;
  let fixture: ComponentFixture<ToolTipFixtureComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      declarations: [ToolTipFixtureComponent],
      imports: [TooltipModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolTipFixtureComponent);
    directive = fixture.componentInstance.tooltipDirective;
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
  });

  it('can load instance', () => {
    console.log(directive);

    expect(directive).toBeTruthy();
  });
});
