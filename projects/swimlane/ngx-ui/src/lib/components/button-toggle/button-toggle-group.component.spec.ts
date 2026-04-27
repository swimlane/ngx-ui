import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonToggleComponent } from './button-toggle.component';
import {
  ButtonToggleGroupComponentFixture,
  ButtonToggleGroupTestModule
} from './button-toggle-group.component.fixture';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';

xdescribe('ButtonToggleGroupComponent', () => {
  const items: string[] = ['toggle1', 'toggle2', 'toggle3'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonToggleGroupTestModule]
    });
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(ButtonToggleGroupComponentFixture);
    expect(fixture).toBeTruthy();
  });

  it('should render all the options', () => {
    const fixture = createFixtureWithBind({ disabled: false, items });
    const buttonToggleGroup = fixture.debugElement.query(By.directive(ButtonToggleGroupComponent));
    expect(buttonToggleGroup).toBeTruthy();

    const buttonToggles = fixture.debugElement.queryAll(By.directive(ButtonToggleComponent));
    expect(buttonToggles.length).toEqual(items.length);
  });

  it('should toggle the button when clicked', () => {
    const fixture = createFixtureWithBind({ disabled: false, items });
    const buttonToggles = fixture.debugElement.queryAll(By.directive(ButtonToggleComponent));

    const buttonToggle1 = buttonToggles[0]!;
    const buttonToggle2 = buttonToggles[1]!;

    expect(buttonToggle1.componentInstance.value).toEqual(items[0]);
    expect(buttonToggle2.componentInstance.value).toEqual(items[1]);

    const mockEvent = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      preventDefault: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      stopPropagation: () => {}
    };

    spyOn(buttonToggle1.componentInstance, 'onChangeCallback').and.callThrough();
    buttonToggle1.query(By.css('button'))?.triggerEventHandler('click', mockEvent);
    expect(buttonToggle1.componentInstance.onChangeCallback).toHaveBeenCalledOnceWith(items[0]);

    spyOn(buttonToggle2.componentInstance, 'onChangeCallback').and.callThrough();
    buttonToggle2.query(By.css('button'))?.triggerEventHandler('click', mockEvent);
    expect(buttonToggle2.componentInstance.onChangeCallback).toHaveBeenCalledOnceWith(items[1]);
  });

  it('should disable the button group when disabled', () => {
    const fixture = createFixtureWithBind({ disabled: true, items });
    const buttonToggleGroup = fixture.debugElement.query(By.directive(ButtonToggleGroupComponent))!;

    expect(buttonToggleGroup.componentInstance.disabled).toBeTruthy();
  });
});

function createFixtureWithBind(options: {
  disabled: boolean;
  items: string[];
}): ComponentFixture<ButtonToggleGroupComponentFixture> {
  const fixture = TestBed.createComponent(ButtonToggleGroupComponentFixture);
  const component = fixture.componentInstance;
  component.items = options.items;
  component.disabled = options.disabled;
  fixture.detectChanges();
  return fixture;
}
