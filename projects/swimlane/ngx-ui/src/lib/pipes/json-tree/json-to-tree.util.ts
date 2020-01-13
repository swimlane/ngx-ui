import { getType } from '../../utils';

import { JsonTreeNode } from './json-tree-node.interface';

export function jsonToTree(value: any, label?: string): JsonTreeNode {
  const type = getType(value);

  let children: any[];
  let expandable = false;

  if (typeof label === 'undefined') {
    label = label || type;
  }

  switch (type) {
    case 'object':
      children = Object.keys(value).map(key => jsonToTree(value[key], key));
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
