import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorNodeComponent } from './json-editor-node.component';

describe('JsonEditorNodeComponent', () => {
  let component: JsonEditorNodeComponent;
  let fixture: ComponentFixture<JsonEditorNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonEditorNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
