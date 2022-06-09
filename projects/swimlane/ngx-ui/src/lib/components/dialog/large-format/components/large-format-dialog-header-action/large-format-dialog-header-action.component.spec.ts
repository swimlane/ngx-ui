import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LargeFormatDialogHeaderActionComponent } from './large-format-dialog-header-action.component';

describe(LargeFormatDialogHeaderActionComponent.name, () => {
  let component: LargeFormatDialogHeaderActionComponent;
  let fixture: ComponentFixture<LargeFormatDialogHeaderActionComponent>;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LargeFormatDialogHeaderActionComponent],
      imports: [NoopAnimationsModule]
    })
      .overrideComponent(LargeFormatDialogHeaderActionComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LargeFormatDialogHeaderActionComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have host class', () => {
    expect(nativeElement.classList.contains('ngx-large-format-dialog-header-action')).toEqual(true);
  });

  it('should have button', () => {
    expect(nativeElement.querySelector('button.ngx-large-format-dialog-header-action__button')).toBeTruthy();
  });

  it('should have close icon', () => {
    expect(
      nativeElement
        .querySelector('button.ngx-large-format-dialog-header-action__button')
        .querySelector('i.ngx-icon.ngx-x')
    ).toBeTruthy();
  });

  describe('dirty', () => {
    it('should have action title', () => {
      expect(nativeElement.querySelector('button').textContent).toContain(component.actionTitle);
    });

    it('should have dirty action title when state is dirty', () => {
      component.dirty = true;
      fixture.detectChanges();

      expect(nativeElement.querySelector('button').textContent).toContain(component.dirtyActionTitle);
    });
  });
});
