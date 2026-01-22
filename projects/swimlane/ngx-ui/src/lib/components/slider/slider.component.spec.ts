import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';
import { SliderFixtureComponent } from './fixtures/slider.fixture';
import { SliderModule } from './slider.module';

describe('SliderComponent', () => {
  let defaultSlider: SliderComponent;
  let multiSlider: SliderComponent;
  let fixture: ComponentFixture<SliderFixtureComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      declarations: [SliderFixtureComponent],
      imports: [SliderModule, FormsModule]
    });

    fixture = TestBed.createComponent(SliderFixtureComponent);
    defaultSlider = fixture.componentInstance.defaultSlider;
    multiSlider = fixture.componentInstance.multiSlider;
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
  });

  it('can load instance', () => {
    expect(defaultSlider).toBeTruthy();
  });

  it('min defaults to: 0', () => {
    expect(defaultSlider.min).toEqual(0);
  });

  it('max defaults to: 100', () => {
    expect(defaultSlider.max).toEqual(100);
  });

  it('step defaults to: 1', () => {
    expect(defaultSlider.step).toEqual(1);
  });

  it('orientation defaults to: horizontal', () => {
    expect(defaultSlider.orientation).toEqual('horizontal');
  });

  it('filled defaults to: false', () => {
    expect(defaultSlider.filled).toEqual(false);
  });

  it('multiple defaults to: false', () => {
    expect(defaultSlider.multiple).toEqual(false);
  });

  it('disabled defaults to: false', () => {
    expect(defaultSlider.disabled).toEqual(false);
  });

  it('showTicks defaults to: false', () => {
    expect(defaultSlider.showTicks).toEqual(false);
  });

  it('_values defaults to: [0]', () => {
    expect(defaultSlider._values).toEqual([0]);
  });

  it('_percents defaults to: [0]', () => {
    expect(defaultSlider._percents).toEqual([0]);
  });

  it('_thumbs defaults to: [{left: "calc(0)"}]', () => {
    expect(defaultSlider._thumbs).toEqual([{ left: 'calc(0% - 0em)' }]);
  });

  it('_ticks defaults to: []', () => {
    expect(defaultSlider._ticks).toEqual([]);
  });

  it('_active defaults to: []', () => {
    expect(defaultSlider._active).toEqual([]);
  });

  it('value defaults to: 0', () => {
    expect(defaultSlider.value).toEqual(0);
  });

  it('clearing _values defaults the value to 0', () => {
    defaultSlider._values = undefined;
    expect(defaultSlider.value).toEqual(0);
  });

  it('when multiple values are set, value returns then as a comma separated string', () => {
    defaultSlider.multiple = true;
    defaultSlider._values = [1, 2, 3];
    expect(defaultSlider.value).toEqual('1,2,3');
  });

  it("setting values to what's already in _values doesnt trigger a change emit", () => {
    spyOn(defaultSlider.change, 'emit');
    spyOn(defaultSlider, 'setValues');
    defaultSlider.value = 0;

    expect(defaultSlider.change.emit).not.toHaveBeenCalled();
    expect(defaultSlider.setValues).not.toHaveBeenCalled();
  });

  it('setting a specific value in multislider updates that value', () => {
    spyOn(multiSlider.change, 'emit');
    spyOn(multiSlider, 'setValues');
    multiSlider.setValue(1, 0);

    expect(multiSlider.change.emit).toHaveBeenCalled();
    expect(multiSlider.setValues).toHaveBeenCalled();
    expect(multiSlider._values[0]).toEqual(1);
  });

  it('setting a specific value in multislider to already set value doesnt trigger a change emit', () => {
    spyOn(multiSlider.change, 'emit');
    spyOn(multiSlider, 'setValues');
    multiSlider.setValue(45, 0);

    expect(multiSlider.change.emit).not.toHaveBeenCalled();
    expect(multiSlider.setValues).not.toHaveBeenCalled();
  });

  it("writing a value to what's already in _values doesn't call setvalues", () => {
    spyOn(defaultSlider, 'setValues');
    defaultSlider.writeValue(0);

    expect(defaultSlider.setValues).not.toHaveBeenCalled();
  });

  it('setting a value to a new value triggers a change emit', () => {
    spyOn(defaultSlider.change, 'emit');
    defaultSlider.value = 1;

    expect(defaultSlider.change.emit).toHaveBeenCalled();
    expect(defaultSlider.value).toEqual('1');
  });

  it('percentage for a multi slider returned as a comma delimited list', () => {
    expect(multiSlider.percent).toEqual('18,39');
  });

  it('setting specific value active', () => {
    multiSlider.setActive(0, true);
    expect(multiSlider._active[0]).toEqual(true);
  });

  it('onMouseDown event sets active to true', () => {
    multiSlider.onMouseDown(new Event('mousedown'));
    expect(multiSlider.active).toEqual(true);
  });

  it('onMouseUp event sets active to false', () => {
    multiSlider.onMouseUp(new Event('mouseup'));
    expect(multiSlider.active).toEqual(false);
  });

  it('onChange method triggers change emitter', () => {
    spyOn(multiSlider.change, 'emit');
    multiSlider.onChange(new Event('change'));

    expect(multiSlider.change.emit).toHaveBeenCalled();
  });

  it('getFill returns undefined when fill is not enabled', () => {
    expect(defaultSlider.getFill()).toEqual(undefined);
  });

  it('getFill returns undefined when fill is not enabled', () => {
    defaultSlider.filled = true;
    const fill = defaultSlider.getFill();
    expect(fill.left).toEqual('0%');
    expect(fill['background-size']).toEqual('0% 100%');
  });
});
