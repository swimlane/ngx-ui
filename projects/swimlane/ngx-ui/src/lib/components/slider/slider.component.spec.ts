import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SliderComponent } from "./slider.component";
describe("SliderComponent", () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SliderComponent]
    });
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("min defaults to: 0", () => {
    expect(component.min).toEqual(0);
  });
  it("max defaults to: 100", () => {
    expect(component.max).toEqual(100);
  });
  it("step defaults to: 1", () => {
    expect(component.step).toEqual(1);
  });
  it("orientation defaults to: horizontal", () => {
    expect(component.orientation).toEqual("horizontal");
  });
  it("filled defaults to: false", () => {
    expect(component.filled).toEqual(false);
  });
  it("multiple defaults to: false", () => {
    expect(component.multiple).toEqual(false);
  });
  it("disabled defaults to: false", () => {
    expect(component.disabled).toEqual(false);
  });
  it("showTicks defaults to: false", () => {
    expect(component.showTicks).toEqual(false);
  });
  it("_values defaults to: [0]", () => {
    expect(component._values).toEqual([0]);
  });
  it("_percents defaults to: [0]", () => {
    expect(component._percents).toEqual([0]);
  });
  it("_thumbs defaults to: []", () => {
    expect(component._thumbs).toEqual([]);
  });
  it("_ticks defaults to: []", () => {
    expect(component._ticks).toEqual([]);
  });
  it("_active defaults to: []", () => {
    expect(component._active).toEqual([]);
  });
  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      spyOn(component, "getTicks");
      component.ngOnInit();
      expect(component.getTicks).toHaveBeenCalled();
    });
  });
  describe("getTicks", () => {
    it("makes expected calls", () => {
      spyOn(component, "getCount");
      component.getTicks();
      expect(component.getCount).toHaveBeenCalled();
    });
  });
});
