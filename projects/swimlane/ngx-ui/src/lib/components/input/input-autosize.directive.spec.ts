import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AutosizeDirective } from './input-autosize.directive';
import { AutosizeDirectiveFixture } from './input-autosave.directive.fixture';

describe('AutosizeDirective', () => {
  let component: AutosizeDirectiveFixture;
  let fixture: ComponentFixture<AutosizeDirectiveFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AutosizeDirectiveFixture, AutosizeDirective],
      imports: [FormsModule, BrowserAnimationsModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutosizeDirectiveFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should adjust size on input', () => {
    const spy = spyOn(component.autosize, 'adjust');
    component.value = 'ttttttttttttttttttttttttttttttttttt';
    component.autosize.onInput();
    expect(spy).toHaveBeenCalled();
  });
});
