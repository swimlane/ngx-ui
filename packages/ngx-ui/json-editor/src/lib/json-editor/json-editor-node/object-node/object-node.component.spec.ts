import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectNodeComponent } from './object-node.component';

describe('ObjectNodeComponent', () => {
  let component: ObjectNodeComponent;
  let fixture: ComponentFixture<ObjectNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
