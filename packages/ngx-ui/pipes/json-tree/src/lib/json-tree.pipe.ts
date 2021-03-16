import { Pipe, PipeTransform } from '@angular/core';
import type { TreeNode } from '@swimlane/ngx-ui/types';
import { jsonToTree } from '@swimlane/ngx-ui/utils/json-to-tree';

@Pipe({
  name: 'jsonTree',
})
export class JsonTreePipe implements PipeTransform {
  transform(value: unknown): TreeNode[] {
    return [jsonToTree(value)];
  }
}
