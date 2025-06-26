import { Binding, EnvironmentInjector, Injector } from '@angular/core';

export interface FilterCustomDropdownComponentOptions {
  index?: number;
  injector?: Injector;
  ngModuleRef?: any;
  environmentInjector?: EnvironmentInjector | any;
  projectableNodes?: Node[][];
  directives?: any[];
  bindings?: Binding[];
}

export interface FilterCustomDropdownConfig {
  type: any;
  options?: FilterCustomDropdownComponentOptions;
}

export interface FilterCustomDropDown {
  component: FilterCustomDropdownConfig;
  closeOnClick?: boolean;
  closeOnOutsideClick?: boolean;
  containerClasses?: string[];
  showCaret?: boolean;
}
