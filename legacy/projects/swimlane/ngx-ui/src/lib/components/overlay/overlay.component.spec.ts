import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayComponent],
      imports: [NoopAnimationsModule]
    });

    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('visible defaults to: false', () => {
    expect(component.visible).toEqual(false);
  });

  it('zIndex defaults to: 990', () => {
    expect(component.zIndex).toEqual(990);
  });

  it('can set zIndex property through coercion', () => {
    component.zIndex = 100;
    expect(component.zIndex).toEqual(100);
  });

  it('setting visible changes animation state to active', () => {
    expect(component.visible).toEqual(false);
    expect(component.animationState).toEqual('inactive');

    component.visible = true;
    expect(component.animationState).toEqual('active');
  });
});
