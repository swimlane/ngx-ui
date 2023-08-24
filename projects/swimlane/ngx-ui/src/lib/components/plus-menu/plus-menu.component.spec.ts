/* eslint-disable security/detect-non-literal-fs-filename */
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Shallow } from 'shallow-render';
import { getDiffableHTML } from '@open-wc/semantic-dom-diff/get-diffable-html';
import { PlusMenuPosition } from './plus-menu-position.enum';

import { HotkeysModule } from '../hotkeys/hotkeys.module';

import { PlusMenuComponent } from './plus-menu.component';
import { PlusMenuModule } from './plus-menu.module';
import { fakeAsync, tick } from '@angular/core/testing';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';

const expectHtmlEquals = (actual: string, expected: string, options?: any) => {
  actual = getDiffableHTML(actual, options);
  expected = getDiffableHTML(expected, options);

  expect(actual).toEqual(expected, 'Expected HTML to match');
};

fdescribe('PlusMenuComponent', () => {
  let shallow: Shallow<PlusMenuComponent>;

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

  beforeEach(() => {
    shallow = new Shallow(PlusMenuComponent, PlusMenuModule).import(HttpClientTestingModule).dontMock(HotkeysModule);
  });

  describe('right', () => {
    describe('one item, default colors', () => {
      let rendering: Rendering<PlusMenuComponent, unknown>;

      beforeEach(async () => {
        rendering = await shallow.render({
          bind: {
            items: [create]
          }
        });
      });

      it('has correct items', () => {
        expect(rendering.find('.ngx-plus-menu--item')).toHaveFound(1);
        expect(rendering.find('.ngx-plus-menu--icon')).toHaveFound(1);
      });

      it('has correct (default) color', () => {
        const icon0 = rendering.find('.ngx-plus-menu--icon-0').nativeElement;
        const style = window.getComputedStyle(icon0);

        expect(style.borderColor).toBe('rgb(159, 206, 54)');
      });

      it('starts closed', () => {
        expect(rendering.instance.open).toBe(false);
        expect(rendering.element.nativeElement).not.toHaveClass('open');
      });

      it('opens', fakeAsync(() => {
        rendering.find('.ngx-plus-menu--circle-container').triggerEventHandler('click', null);
        tick();
        rendering.fixture.detectChanges();

        expect(rendering.instance.open).toBe(true);
        expect(rendering.element.nativeElement).toHaveClass('open');
      }));

      it('renders correct item content', () => {
        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--item-0').nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-0">
            Create
            <div class="subtitle">
              ctrl + alt + n
            </div>
          </div>`
        );
      });

      it('renders correct icons', () => {
        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--icon-0').nativeElement,
          `
          <div class="ngx-plus-menu--icon ngx-plus-menu--icon-0">
            <ngx-icon ng-reflect-font-icon="add-circle-thin">
            </ngx-icon>
          </div>`
        );
      });
    });

    describe('two items, default colors', () => {
      let rendering: Rendering<PlusMenuComponent, unknown>;

      beforeEach(async () => {
        rendering = await shallow.render({
          bind: {
            items: [upload, create]
          }
        });
      });

      it('has correct items', () => {
        expect(rendering.find('.ngx-plus-menu--item')).toHaveFound(2);
        expect(rendering.find('.ngx-plus-menu--icon')).toHaveFound(2);
      });

      it('has correct (default) color', () => {
        const icon0 = rendering.find('.ngx-plus-menu--icon-0').nativeElement;
        const style = window.getComputedStyle(icon0);

        expect(style.borderColor).toBe('rgb(159, 206, 54)');
      });

      it('starts closed', () => {
        expect(rendering.instance.open).toBe(false);
        expect(rendering.element.nativeElement).not.toHaveClass('open');
      });

      it('opens', fakeAsync(() => {
        rendering.find('.ngx-plus-menu--circle-container').triggerEventHandler('click', null);
        tick();
        rendering.fixture.detectChanges();

        expect(rendering.instance.open).toBe(true);
        expect(rendering.element.nativeElement).toHaveClass('open');
      }));

      it('renders correct item content', () => {
        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--item-0').nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-0">
            Upload a plugin
            <div class="subtitle">
              ctrl + alt + u
            </div>
          </div>`
        );

        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--item-1').nativeElement,
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
          rendering.find('.ngx-plus-menu--icon-0').nativeElement,
          `
          <div class="ngx-plus-menu--icon ngx-plus-menu--icon-0">
            <ngx-icon ng-reflect-font-icon="upload-outline">
            </ngx-icon>
          </div>`
        );

        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--icon-1').nativeElement,
          `
          <div class="ngx-plus-menu--icon ngx-plus-menu--icon-1">
            <ngx-icon ng-reflect-font-icon="add-circle-thin">
            </ngx-icon>
          </div>`
        );
      });
    });

    describe('three items, custom color', () => {
      let rendering: Rendering<PlusMenuComponent, unknown>;

      beforeEach(async () => {
        rendering = await shallow.render({
          bind: {
            items: [upload, create, search],
            menuColor: 'red'
          }
        });
      });

      it('has correct items', () => {
        expect(rendering.find('.ngx-plus-menu--item')).toHaveFound(3);
        expect(rendering.find('.ngx-plus-menu--icon')).toHaveFound(3);
      });

      it('has correct (custom) color', () => {
        const element = rendering.find('.ngx-plus-menu--icon-0').nativeElement;
        const style = window.getComputedStyle(element);

        expect(style.borderColor).toBe('rgb(255, 0, 0)');
      });

      it('renders correct item content', () => {
        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--item-0').nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-0">
            Upload a plugin
            <div class="subtitle">
              ctrl + alt + u
            </div>
          </div>`
        );

        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--item-1').nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-1">
            Create
            <div class="subtitle">
              ctrl + alt + n
            </div>
          </div>`
        );

        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--item-2').nativeElement,
          `
          <div class="ngx-plus-menu--item ngx-plus-menu--item-2">
            Search
          </div>`
        );
      });
    });
  });

  describe('bottom', () => {
    describe('one item, defaults', () => {
      let rendering: Rendering<PlusMenuComponent, unknown>;

      beforeEach(async () => {
        rendering = await shallow.render({
          bind: {
            items: [upload],
            position: PlusMenuPosition.Bottom
          }
        });
      });

      it('shows menu title', () => {
        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--menu-title').nativeElement,
          '<span class="ngx-plus-menu--menu-title"></span>'
        );
      });

      it('has correct items', () => {
        expect(rendering.find('.ngx-plus-menu--item')).toHaveFound(1);
        expect(rendering.find('.ngx-plus-menu--icon')).toHaveFound(1);
      });
    });

    describe('two items, defaults', () => {
      let rendering: Rendering<PlusMenuComponent, unknown>;

      beforeEach(async () => {
        rendering = await shallow.render({
          bind: {
            items: [upload, create],
            position: PlusMenuPosition.Bottom
          }
        });
      });

      it('shows menu title', () => {
        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--menu-title').nativeElement,
          '<span class="ngx-plus-menu--menu-title"></span>'
        );
      });

      it('has correct items', () => {
        expect(rendering.find('.ngx-plus-menu--item')).toHaveFound(2);
        expect(rendering.find('.ngx-plus-menu--icon')).toHaveFound(2);
      });
    });

    describe('three items, custom title', () => {
      let rendering: Rendering<PlusMenuComponent, unknown>;

      beforeEach(async () => {
        rendering = await shallow.render({
          bind: {
            items: [upload, create, search],
            menuColor: 'red',
            position: PlusMenuPosition.Bottom,
            menuTitle: 'Click Here'
          }
        });
      });

      it('shows menu title', () => {
        expectHtmlEquals(
          rendering.find('.ngx-plus-menu--menu-title').nativeElement,
          '<span class="ngx-plus-menu--menu-title">Click Here</span>'
        );
      });

      it('has correct items', () => {
        expect(rendering.find('.ngx-plus-menu--item')).toHaveFound(3);
        expect(rendering.find('.ngx-plus-menu--icon')).toHaveFound(3);
      });
    });
  });
});
