import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OverlayModule } from './overlay.module';
import { ResizeOverlayComponent } from './resize-overlay.component';

describe('ResizeOverlayComponent', () => {
  let fixture: ComponentFixture<ResizeOverlayComponent>;
  let component: ResizeOverlayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, HttpClientTestingModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResizeOverlayComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should instantiate component', () => {
    expect(component).toBeDefined();
  });

  it('should set query', () => {
    const testQuery = 'testQuery';
    component.query = testQuery;

    expect(component.query).toEqual(testQuery);
  });

  it('should return empty keys array if combo is undefined', () => {
    component.combo = undefined;

    expect(component.keys).toEqual([]);
  });

  describe('toggle', () => {
    it('should toggle component', () => {
      const disabled = component.disabled;

      component.toggle();

      expect(component.disabled).toEqual(!disabled);
    });
  });

  describe('onClick', () => {
    it('should not change disabled value if meta and shift key are not pressed', () => {
      const ev = new KeyboardEvent('keyup', { key: 'ctrl' });
      component.disabled = false;

      component.onClick(ev);

      expect(component.disabled).toBeFalse();
    });

    it('should change disabled value if meta and shift key are pressed', () => {
      const ev = new KeyboardEvent('keyup', { shiftKey: true, metaKey: true });
      component.disabled = false;

      component.onClick(ev);

      expect(component.disabled).toBeTrue();
    });
  });
});
