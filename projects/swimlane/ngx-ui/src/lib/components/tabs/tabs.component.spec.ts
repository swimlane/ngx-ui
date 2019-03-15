import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TabsComponent } from "./tabs.component";
describe("TabsComponent", () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TabsComponent]
    });
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("select defaults to: selectTab", () => {
    expect(component.select).toEqual(component.selectTab);
  });
  describe("next", () => {
    it("makes expected calls", () => {
      spyOn(component, "move");
      component.next();
      expect(component.move).toHaveBeenCalled();
    });
  });
  describe("prev", () => {
    it("makes expected calls", () => {
      spyOn(component, "move");
      component.prev();
      expect(component.move).toHaveBeenCalled();
    });
  });
});
