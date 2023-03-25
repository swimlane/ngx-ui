import { ButtonToggleComponent } from './button-toggle.component';
import { Shallow } from 'shallow-render';
import {
  ButtonToggleGroupComponentFixture,
  ButtonToggleGroupTestModule
} from './button-toggle-group.component.fixture';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { By } from '@angular/platform-browser';

describe('ButtonToggleGroupComponent', () => {
  let shallow: Shallow<ButtonToggleGroupComponentFixture>;
  const items: string[] = ['toggle1', 'toggle2', 'toggle3'];

  beforeEach(() => {
    shallow = new Shallow(ButtonToggleGroupComponentFixture, ButtonToggleGroupTestModule);
    shallow.dontMock(ButtonToggleComponent);
  });

  it('should render the component', async () => {
    const { fixture } = await shallow.render();
    expect(fixture).toBeTruthy();
  });

  it('should render all the options', async () => {
    const { find } = await shallow.render({ bind: { disabled: false, items } });
    const buttonToggleGroup = find(ButtonToggleGroupComponent);
    expect(buttonToggleGroup).toBeTruthy();

    const buttonToggles = find(ButtonToggleComponent);
    expect(buttonToggles.length).toEqual(items.length);
  });

  it('should toggle the button when clicked', async () => {
    const { find } = await shallow.render({ bind: { disabled: false, items }, detectChanges: true });
    const buttonToggles = find(ButtonToggleComponent);

    const buttonToggle1 = buttonToggles.at(0)!;
    const buttonToggle2 = buttonToggles.at(1)!;

    expect(buttonToggle1.componentInstance.value).toEqual(items[0]);
    expect(buttonToggle2.componentInstance.value).toEqual(items[1]);

    const mockEvent = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      preventDefault: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      stopPropagation: () => {}
    };

    spyOn(buttonToggle1.componentInstance, 'onChangeCallback').and.callThrough();
    buttonToggle1.query(By.css('button')).triggerEventHandler('click', mockEvent);
    expect(buttonToggle1.componentInstance.onChangeCallback).toHaveBeenCalledOnceWith(items[0]);

    spyOn(buttonToggle2.componentInstance, 'onChangeCallback').and.callThrough();
    buttonToggle2.query(By.css('button')).triggerEventHandler('click', mockEvent);
    expect(buttonToggle2.componentInstance.onChangeCallback).toHaveBeenCalledOnceWith(items[1]);
  });

  it('should disable the button group when disabled', async () => {
    const { find } = await shallow.render({ bind: { disabled: true, items } });
    const buttonToggleGroup = find(ButtonToggleGroupComponent).at(0)!;

    expect(buttonToggleGroup.componentInstance.disabled).toBeTruthy();
  });
});
