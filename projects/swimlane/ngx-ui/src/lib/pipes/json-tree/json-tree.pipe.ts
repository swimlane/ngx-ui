import { Pipe, PipeTransform } from '@angular/core';

import { jsonToTree } from './json-to-tree.util';

@Pipe({
  name: 'jsonTree',
  standalone: false
})
export class JSONTreePipe implements PipeTransform {
  transform(input: unknown): any[] {
    return [jsonToTree(input)];
  }
}
