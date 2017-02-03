import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jsonTree' })
export class JSONTreePipe implements PipeTransform {

  transform(input: any): any {
    return [jsonToTree(input)];
  }

}

function jsonToTree(value: any, label?: string): any {
    const type = getType(value);

    let children;
    let expandable = false;
    if (typeof label === 'undefined') {
      label = label || type;
    }

    switch (type) {
        case 'object':
          children = Object.keys(value).map((key) => jsonToTree(value[key], key));
          expandable = children.length > 0;
          return {
              label,
              expandable,
              expanded: true,
              model: { type, value, expandable },
              children
          };
        case 'array':
          children = value.map(jsonToTree);
          expandable = children.length > 0;
          return {
              label,
              expandable,
              expanded: true,
              model: { type, value, expandable },
              children
          };
        default:
          return {
              label,
              expandable,
              model: { type, value, expandable }
          };
    }
}

function getType(item: any) {
  if (item == null) {
    return 'null';
  }
  return Array.isArray(item) ? 'array' : typeof item;
}
