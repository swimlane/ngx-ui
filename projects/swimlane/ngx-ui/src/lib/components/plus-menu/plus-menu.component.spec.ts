/* eslint-disable security/detect-non-literal-fs-filename */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getDiffableHTML } from '@open-wc/semantic-dom-diff/get-diffable-html';

import { PlusMenuComponent } from './plus-menu.component';
import { PlusMenuModule } from './plus-menu.module';
import { PlusMenuPosition } from './plus-menu-position.enum';

const expectHtmlEquals = (actual: string, expected: string, options?: any) => {
  actual = getDiffableHTML(actual, options);
  expected = getDiffableHTML(expected, options);

  expect(actual).toEqual(expected, 'Expected HTML to match');
};

xdescribe('PlusMenuComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const upload = {
    title: 'Upload a plugin',
    subtitle: 'ctrl + alt + u',
    icon: 'upload-outline'
  };

  const create = {
    title: 'Create',
    subtitle: 'ctrl + alt + n',
    icon: 'add-circle-thin'
  };

  const search = {
    title: 'Search',
    icon: 'search'
  };

  const configure = () => {
    TestBed.configureTestingModule({
      imports: [PlusMenuModule, HttpClientTestingModule]
    });
  };

  describe('right', () => {
    describe('two items, default colors', () => {
      let fixture: ComponentFixture<PlusMenuComponent>;
      let component: PlusMenuComponent;

      beforeEach(() => {
        configure();
        fixture = TestBed.createComponent(PlusMenuComponent);
        component = fixture.componentInstance;
        component.items = [upload, create];
        fixture.detectChanges();
      });

      it('has correct items', () => {
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--item')).length).toBe(2);
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--icon')).length).toBe(2);
      });

      it('has correct (default) color', () => {
        const icon0 = fixture.debugElement.query(By.css('.ngx-plus-menu--icon-0'))?.nativeElement;
        const style = window.getComputedStyle(icon0!);

        expect(style.borderColor).toBe('rgb(159, 206, 54)');
      });

      it('starts closed', () => {
        expect(component.open).toBe(false);
        expect(fixture.debugElement.nativeElement).not.toHaveClass('open');
      });

      it('opens', fakeAsync(() => {
        fixture.debugElement.query(By.css('.ngx-plus-menu--circle-container'))?.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();

        expect(component.open).toBe(true);
        expect(fixture.debugElement.nativeElement).toHaveClass('open');
      }));

      it('renders correct item content', () => {
        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--item-0'))?.nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-0">
            Upload a plugin
            <div class="subtitle">
              ctrl + alt + u
            </div>
          </div>`
        );

        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--item-1'))?.nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-1">
            Create
            <div class="subtitle">
              ctrl + alt + n
            </div>
          </div>`
        );
      });

      it('renders correct icons', () => {
        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--icon-0'))?.nativeElement,
          `
          <div class="ngx-plus-menu--icon ngx-plus-menu--icon-0">
            <ngx-icon ng-reflect-font-icon="upload-outline">
            </ngx-icon>
          </div>`
        );

        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--icon-1'))?.nativeElement,
          `
          <div class="ngx-plus-menu--icon ngx-plus-menu--icon-1">
            <ngx-icon ng-reflect-font-icon="add-circle-thin">
            </ngx-icon>
          </div>`
        );
      });
    });

    describe('three items, custom color', () => {
      let fixture: ComponentFixture<PlusMenuComponent>;

      beforeEach(() => {
        configure();
        fixture = TestBed.createComponent(PlusMenuComponent);
        const instance = fixture.componentInstance;
        instance.items = [upload, create, search];
        instance.menuColor = 'red';
        fixture.detectChanges();
      });

      it('has correct items', () => {
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--item')).length).toBe(3);
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--icon')).length).toBe(3);
      });

      it('has correct (custom) color', () => {
        const element = fixture.debugElement.query(By.css('.ngx-plus-menu--icon-0'))?.nativeElement;
        const style = window.getComputedStyle(element!);

        expect(style.borderColor).toBe('rgb(255, 0, 0)');
      });

      it('renders correct item content', () => {
        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--item-0'))?.nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-0">
            Upload a plugin
            <div class="subtitle">
              ctrl + alt + u
            </div>
          </div>`
        );

        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--item-1'))?.nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-1">
            Create
            <div class="subtitle">
              ctrl + alt + n
            </div>
          </div>`
        );

        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--item-2'))?.nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-2">
            Search
          </div>`
        );
      });
    });
  });

  describe('bottom', () => {
    describe('two items, defaults', () => {
      let fixture: ComponentFixture<PlusMenuComponent>;

      beforeEach(() => {
        configure();
        fixture = TestBed.createComponent(PlusMenuComponent);
        const instance = fixture.componentInstance;
        instance.items = [upload, create];
        instance.position = PlusMenuPosition.Bottom;
        fixture.detectChanges();
      });

      it('shows menu title', () => {
        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--menu-title'))?.nativeElement,
          '<span class="ngx-plus-menu--menu-title"></span>'
        );
      });

      it('has correct items', () => {
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--item')).length).toBe(2);
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--icon')).length).toBe(2);
      });
    });

    describe('three items, custom title', () => {
      let fixture: ComponentFixture<PlusMenuComponent>;

      beforeEach(() => {
        configure();
        fixture = TestBed.createComponent(PlusMenuComponent);
        const instance = fixture.componentInstance;
        instance.items = [upload, create, search];
        instance.menuColor = 'red';
        instance.position = PlusMenuPosition.Bottom;
        instance.menuTitle = 'Click Here';
        fixture.detectChanges();
      });

      it('shows menu title', () => {
        expectHtmlEquals(
          fixture.debugElement.query(By.css('.ngx-plus-menu--menu-title'))?.nativeElement,
          '<span class="ngx-plus-menu--menu-title">Click Here</span>'
        );
      });

      it('has correct items', () => {
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--item')).length).toBe(3);
        expect(fixture.debugElement.queryAll(By.css('.ngx-plus-menu--icon')).length).toBe(3);
      });
    });
  });
});
