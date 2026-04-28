import { TestBed } from '@angular/core/testing';
import { ButtonGroupModule } from './button-group.module';
import { ButtonGroupComponent } from './button-group.component';

describe('Button Group', () => {
  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [ButtonGroupComponent],
      imports: [ButtonGroupModule],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });

  it('Initializes default button group', () => {
    const fixture = TestBed.createComponent(ButtonGroupComponent);
    fixture.detectChanges();
    const buttonGroup = fixture.debugElement.nativeElement;
    expect(buttonGroup).toBeDefined();
    expect(buttonGroup.classList.contains('ngx-button-group')).toBe(true);
    expect(buttonGroup.classList.contains('ngx-button-group--vertical')).toBe(false);
    expect(buttonGroup.classList.contains('ngx-button-group--contained--primary')).toBe(false);
    expect(buttonGroup.classList.contains('ngx-button-group--contained--bordered')).toBe(false);
    expect(buttonGroup.classList.contains('ngx-button-group--text')).toBe(false);
    expect(buttonGroup.classList.contains('ngx-button-group--horizontal')).toBe(true);
    expect(buttonGroup.classList.contains('ngx-button-group--contained')).toBe(true);
    expect(buttonGroup.classList.contains('ngx-button-group--contained--default')).toBe(true);
  });
});
