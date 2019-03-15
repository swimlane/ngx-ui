import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LongPressButtonComponent } from "./long-press-button.component";
describe("LongPressButtonComponent", () => {
  let component: LongPressButtonComponent;
  let fixture: ComponentFixture<LongPressButtonComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LongPressButtonComponent]
    });
    fixture = TestBed.createComponent(LongPressButtonComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("disabled defaults to: false", () => {
    expect(component.disabled).toEqual(false);
  });
  it("duration defaults to: 3000", () => {
    expect(component.duration).toEqual(3000);
  });
  it("icon defaults to: mouse-hold", () => {
    expect(component.icon).toEqual("mouse-hold");
  });
  it("submitted defaults to: false", () => {
    expect(component.submitted).toEqual(false);
  });
  it("active defaults to: true", () => {
    expect(component.active).toEqual(true);
  });
  it("_disabled defaults to: false", () => {
    expect(component._disabled).toEqual(false);
  });
  it("pressed defaults to: false", () => {
    expect(component.pressed).toEqual(false);
  });
  it("_state defaults to: active", () => {
    expect(component._state).toEqual("active");
  });
  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      spyOn(component, "updateState");
      component.ngOnInit();
      expect(component.updateState).toHaveBeenCalled();
    });
  });
  describe("ngOnChanges", () => {
    it("makes expected calls", () => {
      spyOn(component, "updateState");
      component.ngOnChanges();
      expect(component.updateState).toHaveBeenCalled();
    });
  });
  describe("updateState", () => {
    it("makes expected calls", () => {
      spyOn(component, "getState");
      component.updateState();
      expect(component.getState).toHaveBeenCalled();
    });
  });
  describe("onLongPressFinish", () => {
    it("makes expected calls", () => {
      spyOn(component, "updateState");
      component.onLongPressFinish({});
      expect(component.updateState).toHaveBeenCalled();
    });
  });
});
