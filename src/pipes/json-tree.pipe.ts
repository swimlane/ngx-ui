import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jsonTree' })
export class JSONTreePipe implements PipeTransform {

  transform(input: any): any {
    return [jsonToTree('root', input)];
  }

}

function jsonToTree(label: string, value: any): any {
    const type = typeof value;
    switch (type) {
        case 'object':
          const children = Object.keys(value).map((key) => jsonToTree(key, value[key]));
          const expandable = children.length > 0;
          return {
              label: label || type,
              expandable,
              expanded: true,
              model: { type, value, expandable },
              children
          };
        default:
          return {
              label: label || type,
              expandable: false,
              model: { type, value, expandable: false }
          };
    }
}
