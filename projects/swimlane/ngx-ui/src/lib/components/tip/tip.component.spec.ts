import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TipComponent } from './tip.component';
import { TipModule } from './tip.module';

describe('TipComponent', () => {
  let component: TipComponent;
  let fixture: ComponentFixture<TipComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TipModule]
    });
    fixture = TestBed.createComponent(TipComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isCloseable has default value', () => {
    expect(component.isCloseable).toEqual(false);
  });
  it('status values', () => {
    expect(component.TipStatus.Success).toEqual('success');
    expect(component.TipStatus.Error).toEqual('error');
    expect(component.TipStatus.Notice).toEqual('notice');
    expect(component.TipStatus.Warning).toEqual('warning');
  });
  it('default icon', () => {
    const defaultIcon = 'info-filled-small';
    component.ngOnChanges();
    expect(component.icon).toEqual(defaultIcon);
  });
  it('error icon', () => {
    const errorIcon = 'warning-filled-sm';
    (component.status as any) = 'error';
    component.ngOnChanges();
    expect(component.icon).toEqual(errorIcon);
  });
  it('warning icon', () => {
    const warningIcon = 'alert';
    (component.status as any) = 'warning';
    component.ngOnChanges();
    expect(component.icon).toEqual(warningIcon);
  });
  it('dislay custom icon', () => {
    const warningIcon = 'alert';
    const customIcon = 'smiley-frown';
    (component.status as any) = 'warning';
    component.icon = customIcon;
    component.ngOnChanges();
    expect(component.icon).not.toEqual(warningIcon);
    expect(component.icon).toEqual(customIcon);
  });
  it('emits close', () => {
    vi.spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
