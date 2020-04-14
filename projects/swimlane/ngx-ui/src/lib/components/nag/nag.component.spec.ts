import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';

import { NagComponent } from './nag.component';

describe('NagComponent', () => {
  let component: NagComponent;
  let fixture: ComponentFixture<NagComponent>;
  const simpleChangesStub: SimpleChanges = { watch: new SimpleChange(0, 2, true) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NagComponent],
      imports: [NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(NagComponent);
    component = fixture.componentInstance;

    fixture.autoDetectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('state defaults to: closed', () => {
    expect(component.state).toEqual('closed');
  });

  it('can set component z index', () => {
    component.zIndex = 100;

    expect(component.zIndex).toEqual(100);
  });

  it('toggle changes state and triggers stateChanged emitter', () => {
    component.state = 'peek';
    spyOn(component.stateChanged, 'emit');

    component.toggle();
    expect(component.state).toEqual('open');

    component.toggle();
    expect(component.state).toEqual('peek');

    expect(component.stateChanged.emit).toHaveBeenCalledTimes(2);
  });

  it('can peek into component if hide is false', () => {
    component.state = 'closed';
    component.hide = false;

    component.ngOnChanges(simpleChangesStub);
    expect(component.state).toEqual('peek');
  });

  it('nag remains closed if hide is true', () => {
    component.state = 'closed';
    component.hide = true;

    component.ngOnChanges(simpleChangesStub);
    expect(component.state).toEqual('closed');
  });
});
