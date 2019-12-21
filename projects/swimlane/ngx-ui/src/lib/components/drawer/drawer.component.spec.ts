import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DrawerComponent } from './drawer.component';
import { DrawerDirection } from './drawer-direction.enum';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerComponent],
      imports: [NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;

    component.size = 10;
    component.zIndex = 10;
    component.closeOnOutsideClick = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.size).toEqual(10);
    expect(component.zIndex).toEqual(10);
    expect(component.closeOnOutsideClick).toEqual(true);
  });

  describe('cssClasses', () => {
    it('should get left drawer classes', () => {
      component.direction = DrawerDirection.Left;
      expect(component.cssClasses).toContain('left-drawer');
    });

    it('should get bottom drawer classes', () => {
      component.direction = DrawerDirection.Bottom;
      expect(component.cssClasses).toContain('bottom-drawer');
    });
  });

  describe('onEscapeKey', () => {
    it('should close', () => {
      const spy = spyOn(component.close, 'emit');
      component.onEscapeKey();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setDimensions', () => {
    it('should set size when direction left', (done) => {
      component.direction = DrawerDirection.Left;
      component.setDimensions(10);

      setTimeout(() => {
        expect(component.transform).toContain(`translate(-`);
        done();
      });
    });

    it('should direction left', (done) => {
      component.direction = DrawerDirection.Left;
      component.setDimensions(0);

      setTimeout(() => {
        expect(component.transform).toEqual(`translate(100%, 0)`);
        done();
      });
    });

    it('should set size when direction bottom', (done) => {
      component.direction = DrawerDirection.Bottom;
      component.setDimensions(10);

      setTimeout(() => {
        expect(component.transform).toContain(`translate(0px`);
        done();
      });
    });

    it('should direction bottom', (done) => {
      component.direction = DrawerDirection.Bottom;
      component.setDimensions(0);

      setTimeout(() => {
        expect(component.transform).toEqual(`translate(0, 100%)`);
        done();
      });
    });
  });
});
