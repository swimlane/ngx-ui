import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionService } from '../../services/injection/injection.service';
import { OverlayModule } from './overlay.module';
import { OverlayService } from './overlay.service';
import { OverlayComponent } from './overlay.component';

describe('OverlayService', () => {
  let service: OverlayService;
  let injectionService: InjectionService;
  let component: ComponentFixture<OverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule]
    }).compileComponents();

    component = TestBed.createComponent(OverlayComponent);
    service = TestBed.inject(OverlayService);
    service.component = component.componentRef;
    injectionService = TestBed.inject(InjectionService);
    spyOn(injectionService, 'appendComponent').and.callFake(() => {
      return component.componentRef;
    });
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('service with no defined component does not return instance', () => {
    service.component = undefined;
    expect(service.instance).toEqual(undefined);
  });

  it('calling hide with no triggered components sets visible to false', () => {
    service.hide();
    expect(service.instance.visible).toEqual(false);
  });

  it('calling hide with some triggered components does not set visible to false', () => {
    service.show({ triggerComponent: component.componentInstance });
    expect(service.triggerComponents.length).toEqual(1);

    service.hide();
    expect(service.instance.visible).not.toEqual(false);
  });

  it('calling destroy sets component to undefined', done => {
    service.destroy();

    setTimeout(() => {
      expect(service.component).toBeUndefined();
      done();
    }, 101);
  });

  it('calling destroy while triggered components exist will not destroy component ref', done => {
    service.show({ triggerComponent: component.componentInstance });
    expect(service.triggerComponents.length).toEqual(1);

    service.destroy();

    setTimeout(() => {
      expect(service.component).toBeTruthy();
      done();
    }, 101);
  });

  it('calling destroy with component already undefined will not throw error', () => {
    service.component = undefined;

    expect(() => service.destroy()).not.toThrowError();
  });

  it('calling show with no options throws error', () => {
    expect(() => service.show()).toThrowError('ngx-ui OverlayService.show: triggerComponent missing ');
  });

  it('calling show adds component to triggerComponents and sets it to visible', () => {
    service.show({ triggerComponent: component.componentInstance });

    expect(service.triggerComponents.length).toEqual(1);
    expect(service.instance.visible).toEqual(true);
  });

  it('injectComponent calls the injection service appendComponent', () => {
    service.injectComponent();
    expect(injectionService.appendComponent).toHaveBeenCalled();
  });

  it('onClick with no triggered components does not emit click event', () => {
    spyOn(service.click, 'emit');
    service.show({ triggerComponent: component.componentInstance });
    expect(service.triggerComponents.length).toEqual(1);

    service.onClick();
    expect(service.click.emit).toHaveBeenCalled();
  });

  it('onClick with some triggered components emits click event', () => {
    spyOn(service.click, 'emit');

    service.onClick();

    expect(service.click.emit).not.toHaveBeenCalled();
  });

  it('removeTriggerComponent removes component from triggeredComponents array', () => {
    service.show({ triggerComponent: component.componentInstance });
    service.show({ triggerComponent: component.componentInstance });

    expect(service.triggerComponents.length).toEqual(2);

    service.removeTriggerComponent(component.componentInstance);
    expect(service.triggerComponents.length).toEqual(1);
  });

  it('removeTriggerComponent when no components have been triggered calls destroy and clears component', done => {
    service.removeTriggerComponent(component.componentInstance);

    setTimeout(() => {
      expect(service.component).toBeUndefined();
      done();
    }, 101);
  });

  it('calling show with no defined component uses the injection service to create one', () => {
    service.component = undefined;
    service.show({ triggerComponent: component.componentInstance });

    expect(injectionService.appendComponent).toHaveBeenCalled();
    expect(service.component).toBeTruthy();
    expect(service.triggerComponents.length).toEqual(1);
    expect(service.instance.visible).toEqual(true);
  });
});
