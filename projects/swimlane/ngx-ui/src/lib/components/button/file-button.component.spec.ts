import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, NgZone } from "@angular/core";
import { FileButtonComponent } from "./file-button.component";
import { FileButtonStyleType } from './file-button-style.type';
describe("FileButtonComponent", () => {
  let component: FileButtonComponent;
  let fixture: ComponentFixture<FileButtonComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FileButtonComponent]
    });
    fixture = TestBed.createComponent(FileButtonComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("styleType defaults to: FileButtonStyleType.standard", () => {
    expect(component.styleType).toEqual(FileButtonStyleType.standard);
  });
  it("isItemSuccessful defaults to: false", () => {
    expect(component.isItemSuccessful).toEqual(false);
  });
  it("progress defaults to: 0%", () => {
    expect(component.progress).toEqual("0%");
  });
  it("fileOverDropzone defaults to: false", () => {
    expect(component.fileOverDropzone).toEqual(false);
  });
});
