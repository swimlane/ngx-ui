import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RadioButtonComponent } from "./radiobutton.component";
describe("RadioButtonComponent", () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RadioButtonComponent]
    });
    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("id defaults to: _uniqueId", () => {
    expect(component.id).toEqual(component._uniqueId);
  });
  it("name defaults to: _uniqueId", () => {
    expect(component.name).toEqual(component._uniqueId);
  });
  it("tabindex defaults to: 0", () => {
    expect(component.tabindex).toEqual(0);
  });
  it("groupDisabled defaults to: false", () => {
    expect(component.groupDisabled).toEqual(false);
  });
});
