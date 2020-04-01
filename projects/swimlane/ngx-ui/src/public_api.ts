/*
 * Public API Surface of ngx-ui
 */

// animations
export * from './lib/animations/bounce.animation';
export * from './lib/animations/fade-in.animation';
export * from './lib/animations/fade-out.animation';
export * from './lib/animations/slide-bottom.animation';
export * from './lib/animations/slide-down-fade-out.animation';
export * from './lib/animations/slide-left.animation';
export * from './lib/animations/slide-right.animation';
export * from './lib/animations/slide-top.animation';
export * from './lib/animations/slide-up-fade-out.animation';

// services
export * from './lib/services/icon-registry/icon-registry.service';

// pipes
export * from './lib/pipes/cammel-to-snake/cammel-to-snake.module';
export * from './lib/pipes/cammel-to-snake/cammel-to-snake.pipe';
export * from './lib/pipes/decamelize/decamelize.module';
export * from './lib/pipes/decamelize/decamelize.pipe';
export * from './lib/pipes/filter/filter.module';
export * from './lib/pipes/filter/filter.pipe';
export * from './lib/pipes/json-tree/json-tree.module';
export * from './lib/pipes/json-tree/json-tree.pipe';
export * from './lib/pipes/time-zone/time-zone.module';
export * from './lib/pipes/time-zone/time-zone.pipe';

// directives
export * from './lib/directives/dbl-click-copy/dbl-click-copy.module';
export * from './lib/directives/dbl-click-copy/dbl-click-copy.directive';
export * from './lib/directives/long-press/long-press.module';
export * from './lib/directives/long-press/long-press.directive';
export * from './lib/directives/resize-observer/resize-observer.module';
export * from './lib/directives/resize-observer/resize-observer.directive';
export * from './lib/directives/validators/pattern-validator/pattern-validator.module';
export * from './lib/directives/validators/pattern-validator/pattern-validator.directive';
export * from './lib/directives/visibility/visibility.module';
export * from './lib/directives/visibility/visibility.directive';

export * from './lib/components';
export * from './lib/ngx-ui.module';
