import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from '@swimlane/ngx-ui/typings';
import { jsonToTree } from '@swimlane/ngx-ui/utils';

@Pipe({
  name: 'jsonTree',
})
export class JsonTreePipe implements PipeTransform {
  transform(value: unknown): TreeNode[] {
    return [jsonToTree(value)];
  }
}
