import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TreeNodeComponent } from "./tree-node.component";
describe("TreeNodeComponent", () => {
  let component: TreeNodeComponent;
  let fixture: ComponentFixture<TreeNodeComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TreeNodeComponent]
    });
    fixture = TestBed.createComponent(TreeNodeComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  it("select defaults to: selectNode", () => {
    expect(component.select).toEqual(component.selectNode);
  });
});
