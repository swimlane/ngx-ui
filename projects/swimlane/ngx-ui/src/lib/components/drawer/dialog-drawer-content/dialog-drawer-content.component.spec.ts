import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogDrawerContentComponent } from './dialog-drawer-content.component';

describe(DialogDrawerContentComponent.name, () => {
  let component: DialogDrawerContentComponent;
  let fixture: ComponentFixture<DialogDrawerContentComponent>;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDrawerContentComponent],
      imports: [NoopAnimationsModule]
    })
      .overrideComponent(DialogDrawerContentComponent, { set: { changeDetection: ChangeDetectionStrategy.Default } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDrawerContentComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    component.drawerTitle = 'Title';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have host class', () => {
    expect(nativeElement.classList.contains('ngx-dialog-drawer-content')).toEqual(true);
  });

  it('should have title', () => {
    const h2Title = nativeElement.querySelector('h2.ngx-dialog-drawer-content__header-title') as HTMLHeadingElement;
    expect(h2Title).toBeTruthy();
    expect(h2Title.textContent).toContain(component.drawerTitle);
  });

  describe('dismiss button', () => {
    let dismissBtn: HTMLButtonElement;
    beforeEach(() => {
      dismissBtn = nativeElement.querySelector('button.ngx-dialog-drawer-content__dismiss-btn');
    });

    it('should have default dismiss button', () => {
      expect(dismissBtn).toBeTruthy();
    });

    it('should have arrow down icon', () => {
      expect(dismissBtn.querySelector('i.ngx-icon.ngx-arrow-bold-down')).toBeTruthy();
    });

    it('should have default dismiss button text', () => {
      expect(dismissBtn.textContent).toContain(component.dismissBtnText);
    });

    it('should display custom dismiss button text', () => {
      component.dismissBtnText = 'Custom Dismiss';
      fixture.detectChanges();
      expect(dismissBtn.textContent).toContain('Custom Dismiss');
    });
  });

  it('should have content section', () => {
    expect(nativeElement.querySelector('section.ngx-dialog-drawer-content__content')).toBeTruthy();
  });
});
