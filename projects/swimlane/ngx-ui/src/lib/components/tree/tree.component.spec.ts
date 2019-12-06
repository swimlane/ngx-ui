import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeComponent } from './tree.component';
import { TreeModule } from './tree.module';
import { TreeFixtureComponent } from './fixtures/tree.fixture';

describe('TreeComponent', () => {
  let component1: TreeComponent;
  let component2: TreeComponent;
  let fixture: ComponentFixture<TreeFixtureComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [TreeModule],
      declarations: [TreeFixtureComponent]
    });
    fixture = TestBed.createComponent(TreeFixtureComponent);
    component1 = fixture.componentInstance.treeComponent1;
    component2 = fixture.componentInstance.treeComponent2;

    fixture.autoDetectChanges();
    fixture.whenStable().then(() => {
      done();
    });
  });

  it('can load instance', () => {
    expect(component1).toBeTruthy();
    expect(component2).toBeTruthy();
  });

  it('Tree component loads template from input', () => {
    expect(component1.template).toBeDefined();
  });

  it('Tree component loads template from its content', () => {
    expect(component2.template).toBeDefined();
  });
});
