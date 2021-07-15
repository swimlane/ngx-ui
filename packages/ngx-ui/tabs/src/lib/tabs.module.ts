import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IfTabActiveDirective } from './directives';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabsComponent, TabComponent, IfTabActiveDirective],
  exports: [TabsComponent, TabComponent, IfTabActiveDirective],
})
export class TabsModule {}
