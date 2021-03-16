import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayNodeComponent } from './array-node.component';

describe('ArrayNodeComponent', () => {
  let component: ArrayNodeComponent;
  let fixture: ComponentFixture<ArrayNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
