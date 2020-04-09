import { Pipe, PipeTransform } from '@angular/core';

import { jsonToTree } from './json-to-tree.util';

@Pipe({
  name: 'jsonTree',
})
export class JSONTreePipe implements PipeTransform {
  transform(input: any): any[] {
    return [jsonToTree(input)];
  }
}
