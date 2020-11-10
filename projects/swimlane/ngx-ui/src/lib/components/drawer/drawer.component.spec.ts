import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DrawerComponent } from './drawer.component';
import { DrawerDirection } from './drawer-direction.enum';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DrawerComponent],
        imports: [NoopAnimationsModule]
      }).compileComponents();
    })
  );

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

    it('should set position to absolute when isRoot is set to false', () => {
      component.isRoot = false;
      component.ngOnInit();
      expect(component.position).toEqual('absolute');
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
    it('should set width and size to 100% when component size isnt defined', () => {
      component.direction = DrawerDirection.Left;
      component.setDimensions(undefined);

      expect(component.heightSize).toEqual('100%');
      expect(component.widthSize).toEqual('100%');
    });

    it('should set width to size and height to 100% when drawer direction is left', () => {
      component.direction = DrawerDirection.Left;
      component.setDimensions(50);

      expect(component.heightSize).toEqual('100%');
      expect(component.widthSize).toEqual('50%');
    });

    it('should set height to size and width to 100% when drawer direction is bottom', () => {
      component.direction = DrawerDirection.Bottom;
      component.setDimensions(50);

      expect(component.heightSize).toEqual('50%');
      expect(component.widthSize).toEqual('100%');
    });
  });
});
