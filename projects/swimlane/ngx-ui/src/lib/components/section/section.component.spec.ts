import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SectionComponent } from './section.component';
describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SectionComponent]
    });
    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
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
});
