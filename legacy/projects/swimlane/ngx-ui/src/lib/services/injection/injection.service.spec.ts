import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Type,
  ViewContainerRef
} from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InjectionService } from './injection.service';

describe('InjectionService', () => {
  let service: InjectionService;
  let appRef: any;
  let componentRef: any;

  beforeEach(() => {
    const componentFactoryResolverStub = {
      resolveComponentFactory: () => ({ create: () => ({}) })
    };
    const injectorStub = {};
    const viewContainerRefStub = {};
    const typeStub = {};

    appRef = { components: [{}] };
    componentRef = { instance: {} };

    TestBed.configureTestingModule({
      providers: [
        InjectionService,
        { provide: ApplicationRef, useValue: appRef },
        {
          provide: ComponentFactoryResolver,
          useValue: componentFactoryResolverStub
        },
        { provide: ComponentRef, useValue: componentRef },
        { provide: Injector, useValue: injectorStub },
        { provide: ViewContainerRef, useValue: viewContainerRefStub },
        { provide: Type, useValue: typeStub }
      ]
    });

    service = TestBed.inject(InjectionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getRootViewContainer', () => {
    it('should get root container', () => {
      InjectionService.setGlobalRootViewContainer({ test: 'test' } as any);
      expect(service.getRootViewContainer() as any).toEqual({ test: 'test' });
    });

    it('should get container', () => {
      service.setRootViewContainer({ test: 'test' } as any);
      expect(service.getRootViewContainer() as any).toEqual({ test: 'test' });
    });

    it('should get root component', () => {
      InjectionService.setGlobalRootViewContainer(undefined);
      expect(service.getRootViewContainer() as any).toEqual({});
    });

    xit('should throw error when no container found', () => {
      appRef.components = [];
      expect(() => {
        service.getRootViewContainer();
      }).toThrowError();
    });
  });

  describe('getComponentRootNode', () => {
    it('should get native element', () => {
      componentRef = { location: { nativeElement: 'test' } };
      expect(service.getRootViewContainerNode(componentRef) as any).toEqual('test');
    });
  });

  describe('projectComponentBindings', () => {
    it('should project bindings onto component instance', () => {
      expect(
        service.projectComponentBindings(
          {
            instance: {}
          } as any,
          {
            inputs: {
              test: 'test'
            },
            outputs: {
              test1: 'test1',
              test2: 'test2'
            }
          }
        ).instance
      ).toEqual({
        test: 'test',
        test1: 'test1',
        test2: 'test2'
      });
    });

    it('should do nothing when no bindings', () => {
      expect(service.projectComponentBindings({ instance: {} } as any, undefined)).toEqual({
        instance: {}
      } as any);
    });
  });
});
