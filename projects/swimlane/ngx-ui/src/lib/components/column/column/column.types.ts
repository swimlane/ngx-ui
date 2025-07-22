import { Binding, EnvironmentInjector, Injector } from '@angular/core';

export interface ColumnCustomComponentOptions {
  index?: number;
  injector?: Injector;
  ngModuleRef?: any;
  environmentInjector?: EnvironmentInjector | any;
  projectableNodes?: Node[][];
  directives?: any[];
  bindings?: Binding[];
}

export interface Column {
  id: string;
  active: boolean;
  title: string;
  templateRef?: string;
  children?: Array<Column>;
  content?: {
    width?: string;
    component: any;
    options?: ColumnCustomComponentOptions;
  };
}
