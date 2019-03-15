import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, SimpleChanges } from "@angular/core";
import { NagComponent } from "./nag.component";
describe("NagComponent", () => {
  let component: NagComponent;
  let fixture: ComponentFixture<NagComponent>;
  beforeEach(() => {
    const simpleChangesStub = { watch: {} };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NagComponent]
    });
    fixture = TestBed.createComponent(NagComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("state defaults to: closed", () => {
    expect(component.state).toEqual("closed");
  });
});
