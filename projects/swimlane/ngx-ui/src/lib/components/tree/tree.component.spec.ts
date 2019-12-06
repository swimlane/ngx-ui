import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeComponent } from './tree.component';
import { TreeModule } from 'dist/swimlane/ngx-ui/public_api';
import { TreeFixtureComponent } from './fixtures/tree.fixture';

fdescribe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule],
      declarations: [TreeFixtureComponent]
    });
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
