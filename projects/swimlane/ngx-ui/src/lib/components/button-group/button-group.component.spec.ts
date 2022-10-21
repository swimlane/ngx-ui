import { TestBed } from '@angular/core/testing';
import { ButtonGroupModule } from './button-group.module';
import { ButtonGroupComponent } from './button-group.component';

describe('Button Group', () => {
  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [ButtonGroupComponent],
      imports: [ButtonGroupModule]
    }).compileComponents();
  });

  it('Initializes default button group', () => {
    const fixture = TestBed.createComponent(ButtonGroupComponent);
    fixture.detectChanges();
    const buttonGroup = fixture.debugElement.nativeElement;
    expect(buttonGroup).toBeDefined();
    expect(buttonGroup).toHaveClass('ngx-button-group');
    expect(buttonGroup).not.toHaveClass('ngx-button-group--vertical');
    expect(buttonGroup).not.toHaveClass('ngx-button-group--contained--primary');
    expect(buttonGroup).not.toHaveClass('ngx-button-group--contained--bordered');
    expect(buttonGroup).not.toHaveClass('ngx-button-group--text');
    expect(buttonGroup).toHaveClass('ngx-button-group--horizontal');
    expect(buttonGroup).toHaveClass('ngx-button-group--contained');
    expect(buttonGroup).toHaveClass('ngx-button-group--contained--default');
  });
});
