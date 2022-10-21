import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LargeFormatDialogHeaderTitleComponent } from './large-format-dialog-header-title.component';

describe(LargeFormatDialogHeaderTitleComponent.name, () => {
  let component: LargeFormatDialogHeaderTitleComponent;
  let fixture: ComponentFixture<LargeFormatDialogHeaderTitleComponent>;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LargeFormatDialogHeaderTitleComponent],
      imports: [NoopAnimationsModule]
    })
      .overrideComponent(LargeFormatDialogHeaderTitleComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LargeFormatDialogHeaderTitleComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have host class', () => {
    expect(nativeElement.classList.contains('ngx-large-format-dialog-header-title')).toEqual(true);
  });

  it('should have title', () => {
    component.dialogTitle = 'Title';
    fixture.detectChanges();

    expect(nativeElement.querySelector('h1')?.textContent).toContain(component.dialogTitle);
  });

  describe('subtitle', () => {
    it('should not have subtitle', () => {
      expect(nativeElement.querySelector('h4')).not.toBeTruthy();
    });

    it('should not have subtitle when dialogSubtitleTemplate is defined', () => {
      component.dialogSubtitleTemplate = null;
      expect(nativeElement.querySelector('h4')).not.toBeTruthy();
    });

    it('should have subtitle when subtitle is passed in', () => {
      component.dialogSubtitle = 'subtitle';
      fixture.detectChanges();

      expect(nativeElement.querySelector('h4')?.textContent).toContain(component.dialogSubtitle);
    });
  });
});
