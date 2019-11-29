import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AutosizeDirective } from './input-autosize.directive';

@Component({
  selector: `ngx-test-host-component`,
  template: `
    <textarea
      [(ngModel)]="value"
      autosize
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  value = 'test';

  @ViewChild(AutosizeDirective)
  readonly autosize: AutosizeDirective;
}

describe('AutosizeDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TestHostComponent, AutosizeDirective],
      imports: [FormsModule, BrowserAnimationsModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
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

