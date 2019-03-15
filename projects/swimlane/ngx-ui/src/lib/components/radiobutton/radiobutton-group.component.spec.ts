import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RadioButtonGroupComponent } from "./radiobutton-group.component";
describe("RadioButtonGroupComponent", () => {
  let component: RadioButtonGroupComponent;
  let fixture: ComponentFixture<RadioButtonGroupComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RadioButtonGroupComponent]
    });
    fixture = TestBed.createComponent(RadioButtonGroupComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("id defaults to: _uniqueId", () => {
    expect(component.id).toEqual(component._uniqueId);
  });
  it("tabindex defaults to: 0", () => {
    expect(component.tabindex).toEqual(0);
  });
  it("disabled defaults to: false", () => {
    expect(component.disabled).toEqual(false);
  });
  describe("ngAfterContentInit", () => {
    it("makes expected calls", () => {
      spyOn(component, "subscribeToRadios");
      component.ngAfterContentInit();
      expect(component.subscribeToRadios).toHaveBeenCalled();
    });
  });
  describe("ngOnDestroy", () => {
    it("makes expected calls", () => {
      spyOn(component, "deleteSubscriptions");
      component.ngOnDestroy();
      expect(component.deleteSubscriptions).toHaveBeenCalled();
    });
  });
  describe("subscribeToRadios", () => {
    it("makes expected calls", () => {
      spyOn(component, "deleteSubscriptions");
      component.subscribeToRadios();
      expect(component.deleteSubscriptions).toHaveBeenCalled();
    });
  });
});
