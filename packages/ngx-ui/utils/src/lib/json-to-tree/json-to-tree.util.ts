import type { TreeNode } from '@swimlane/ngx-ui/typings';
import { getType } from '../get-type';

export function jsonToTree(value: any, label?: string): TreeNode {
  const type = getType(value);

  let children: TreeNode[];
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
        model: { type, value },
        children,
      };
    case 'array':
      children = value.map(jsonToTree);
      expandable = children.length > 0;

      return {
        label,
        expandable,
        expanded: true,
        model: { type, value },
        children,
      };
    default:
      return {
        label,
        expandable,
        model: { type, value },
      };
  }
}
