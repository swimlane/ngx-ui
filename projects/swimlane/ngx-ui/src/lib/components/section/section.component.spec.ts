import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SectionComponent } from './section.component';
import { SectionFixtureComponent } from './fixtures/section.fixture';
import { SectionModule } from './section.module';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionFixtureComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      declarations: [SectionFixtureComponent],
      imports: [SectionModule, HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(SectionFixtureComponent);
    component = fixture.componentInstance.section;
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
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
    spyOn(component.toggle, 'emit');
    component.onSectionClicked();

    expect(component.sectionCollapsed).toEqual(true);
    expect(component.toggle.emit).toHaveBeenCalled();
  });
});
