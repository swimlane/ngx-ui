import { Component } from '@angular/core';

@Component({
  selector: 'app-tree-page',
  templateUrl: './tree-page.component.html'
})
export class TreePageComponent {
  nodes: any[] = [
    { label: 'Node 1' },
    {
      label: 'Node 2',
      expandable: true,
      expanded: true,
      children: [
        { label: 'Node 1' },
        { label: 'Node 2' },
        {
          label: 'Node 3',
          expanded: false,
          expandable: true,
          children: [{ label: 'Node 1' }, { label: 'Node 2' }, { label: 'Node 3' }, { label: 'Node 4' }]
        },
        {
          label: 'Node 4',
          expandable: true,
          expanded: true,
          children: [{ label: 'Node 1' }, { label: 'Node 2' }, { label: 'Node 3' }, { label: 'Node 4' }]
        }
      ]
    },
    { label: 'Node 3' },
    {
      label: 'Node 4',
      children: [{ label: 'Node 1' }, { label: 'Node 2' }, { label: 'Node 3' }, { label: 'Node 4' }],
      expandable: true
    }
  ];

  nodes1: any[] = [
    {
      label: 'Node1',
      model: { type: 'Array', count: 1 }
    },
    {
      label: 'Node2',
      expandable: true,
      model: { type: 'Object' },
      children: [
        {
          label: 'Node1',
          model: { type: 'Array', count: 1 }
        }
      ]
    },
    {
      label: 'Node3',
      model: { type: 'Array', count: 1 }
    }
  ];

  jsonObject = JSON.parse(`{
    "firstName": "John",
    "lastName": "Smith",
    "isAlive": true,
    "age": 25,
    "address": {
      "streetAddress": "21 2nd Street",
      "city": "New York",
      "state": "NY",
      "postalCode": "10021-3100"
    },
    "phoneNumbers": [
      {
        "type": "home",
        "number": "212 555-1234"
      },
      {
        "type": "office",
        "number": "646 555-4567"
      },
      {
        "type": "mobile",
        "number": "123 456-7890"
      }
    ],
    "children": [],
    "spouse": null
  }`);
}
