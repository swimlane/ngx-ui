import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { SectionFixtureComponent } from './fixtures/section.fixture';
import { SectionModule } from './section.module';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionFixtureComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SectionModule, SectionFixtureComponent]
    });

    fixture = TestBed.createComponent(SectionFixtureComponent);
    component = fixture.componentInstance.section;
    fixture.autoDetectChanges();
    await fixture.whenStable().then(() => {});
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('sectionCollapsed defaults to: false', () => {
    expect(component.sectionCollapsed).toEqual(false);
  });

  it('sectionCollapsible defaults to: true', () => {
    expect(component.sectionCollapsible).toEqual(true);
  });

  it('padding defaults to: 1.8em', () => {
    expect(component.padding).toEqual('1.8em');
  });

  it('appearance defaults to legacy', () => {
    expect(component.appearance).toEqual('legacy');
  });

  it('toggle position defaults to: left', () => {
    expect(component.togglePosition).toEqual('left');
  });

  it('Section title set by input', () => {
    expect(component.sectionTitle).toEqual('test title');
  });

  it('onSectionClicked collapses section and triggers toggle emit', () => {
    vi.spyOn(component.toggle, 'emit');
    component.onSectionClicked();

    expect(component.sectionCollapsed).toEqual(true);
    expect(component.toggle.emit).toHaveBeenCalled();
  });
});
