import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  defaultListSortComparator,
  parseListSortDate,
  ListRowId,
  ListRowStatus,
  ListSelectionEvent,
  ListSortEvent,
  ListSortPropDir
} from '@swimlane/ngx-ui';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ListPageComponent {
  cascadeData: Array<Record<string, unknown>> = [
    { id: 'apt', type: 'APT campaign', date: '4/1/2025', origin: 'Unknown', severity: 'Critical' },
    { id: 'access', parentId: 'apt', type: 'Initial access', date: '4/1/2025', origin: 'Unknown', severity: 'High' },
    {
      id: 'persistence',
      parentId: 'access',
      type: 'Persistence',
      date: '4/2/2025',
      origin: 'Unknown',
      severity: 'High'
    },
    {
      id: 'privilege',
      parentId: 'persistence',
      type: 'Privilege escalation',
      date: '4/2/2025',
      origin: 'Unknown',
      severity: 'Critical'
    },
    { id: 'exfil', parentId: 'apt', type: 'Exfiltration plan', date: '4/4/2025', origin: 'Unknown', severity: 'High' },
    { id: 'staging', parentId: 'exfil', type: 'Staging', date: '4/4/2025', origin: 'Unknown', severity: 'Medium' },
    {
      id: 'transfer',
      parentId: 'staging',
      type: 'Data transfer',
      date: '4/5/2025',
      origin: 'Unknown',
      severity: 'High'
    },
    { id: 'ransomware', type: 'Ransomware', date: '4/6/2025', origin: 'North Korea', severity: 'Critical' },
    {
      id: 'encryption',
      parentId: 'ransomware',
      type: 'Encryption payload',
      date: '4/6/2025',
      origin: 'North Korea',
      severity: 'Critical'
    }
  ];

  cascadeSelectedIds: ListRowId[] = ['persistence', 'privilege', 'staging', 'transfer'];

  alignedCascadeColumnLayout: Partial<CSSStyleDeclaration> = {
    gridTemplateColumns: '16rem 1fr 1fr 1fr'
  };

  alignedCascadeSelectedIds: ListRowId[] = [];

  alignmentData: Array<Record<string, unknown>> = [
    {
      id: 'sol-1',
      name: 'Incident Response',
      type: 'Solution',
      owner: 'SOC Team',
      updated: '4/1/2025',
      children: [
        {
          id: 'app-1',
          name: 'Phishing Cases',
          type: 'Application',
          owner: 'SOC Team',
          updated: '4/2/2025',
          children: [
            { id: 'pb-1', name: 'Triage Playbook', type: 'Playbook', owner: 'Security Team', updated: '4/3/2025' },
            { id: 'pb-2', name: 'Enrichment Playbook', type: 'Playbook', owner: 'Security Team', updated: '4/3/2025' }
          ]
        },
        {
          id: 'app-2',
          name: 'Malware Cases',
          type: 'Application',
          owner: 'IR Team',
          updated: '4/4/2025',
          children: [
            { id: 'comp-1', name: 'Sandbox Connector', type: 'Component', owner: 'IR Team', updated: '4/5/2025' }
          ]
        }
      ]
    },
    {
      id: 'sol-2',
      name: 'Vulnerability Mgmt',
      type: 'Solution',
      owner: 'VM Team',
      updated: '4/6/2025',
      children: [{ id: 'app-3', name: 'CVE Tracker', type: 'Application', owner: 'VM Team', updated: '4/7/2025' }]
    }
  ];

  alignmentColumnLayout: Partial<CSSStyleDeclaration> = {
    gridTemplateColumns: '2fr 1fr 1fr 1fr'
  };

  parentIdSelectedIds: ListRowId[] = ['sol-0', 'sol-0-app-0'];

  nestedColumnLayout: Partial<CSSStyleDeclaration> = {
    gridTemplateColumns: '16rem 1fr'
  };

  largeNestedData = this.buildLargeNestedData();

  data: Array<Record<string, unknown>> = [
    {
      type: 'Malware',
      date: '1/1/2025',
      origin: 'China'
    },
    {
      type: 'DDOS',
      date: '1/5/2025',
      origin: 'China'
    },
    {
      type: 'DDOS',
      date: '1/5/2025',
      origin: 'Russia'
    },
    {
      type: 'XSS',
      date: '1/6/2025',
      origin: 'North Korea'
    },
    {
      type: 'DDOS',
      date: '1/6/2025',
      origin: 'North Korea'
    },
    {
      type: 'Ransomware',
      date: '1/8/2025',
      origin: 'China'
    },
    {
      type: 'DDOS',
      date: '1/9/2025',
      origin: 'China'
    },
    {
      type: 'SQL injection',
      date: '1/10/2025',
      origin: 'North Korea'
    },
    {
      type: 'Malware',
      date: '1/11/2025',
      origin: 'Russia'
    },
    {
      type: 'DDOS',
      date: '1/11/2025',
      origin: 'Russia'
    }
  ];

  largeData = [
    ...this.data,
    ...this.data,
    ...this.data,
    ...this.data,
    ...this.data,
    ...this.data,
    ...this.data,
    ...this.data,
    ...this.data
  ];

  dataWithStatus: Array<Record<string, unknown>> = [
    {
      type: 'Malware',
      date: '1/1/2025',
      origin: 'China',
      status: ListRowStatus.Error
    },
    {
      type: 'DDOS',
      date: '1/5/2025',
      origin: 'China',
      status: ListRowStatus.Warning
    },
    {
      type: 'DDOS',
      date: '1/5/2025',
      origin: 'Russia',
      status: ListRowStatus.Warning
    },
    {
      type: 'XSS',
      date: '1/6/2025',
      origin: 'North Korea',
      status: ListRowStatus.Success
    },
    {
      type: 'DDOS',
      date: '1/6/2025',
      origin: 'North Korea',
      status: ListRowStatus.Warning
    },
    {
      type: 'Ransomware',
      date: '1/8/2025',
      origin: 'China',
      status: ListRowStatus.Error
    },
    {
      type: 'DDOS',
      date: '1/9/2025',
      origin: 'China',
      status: ListRowStatus.Warning
    },
    {
      type: 'SQL injection',
      date: '1/10/2025',
      origin: 'North Korea',
      status: ListRowStatus.Success
    },
    {
      type: 'Malware',
      date: '1/11/2025',
      origin: 'Russia',
      status: ListRowStatus.Error
    },
    {
      type: 'XSS',
      date: '1/11/2025',
      origin: 'Russia',
      status: ListRowStatus.Success
    }
  ];

  columnLayout: Partial<CSSStyleDeclaration> = {
    gridTemplateColumns: '3fr 2fr 1fr'
  };

  paginationColumnLayout: Partial<CSSStyleDeclaration> = {
    gridTemplateColumns: '5rem 1fr 1fr 1fr'
  };

  paginationConfig = {
    pageSize: 10
  };

  paginationConfigPage5 = {
    index: 5,
    pageSize: 10
  };

  rowStatus: ListRowStatus = ListRowStatus.Error;

  externalSortData: Array<Record<string, unknown>> = [...this.data];
  externalSort: ListSortPropDir | null = {
    prop: 'date',
    dir: 'desc'
  };

  onExternalSort(event: ListSortEvent): void {
    this.externalSort = event.sort ? { ...event.sort } : null;

    if (!event.sort) {
      this.externalSortData = [...this.data];
      return;
    }

    const { prop, dir } = event.sort;
    const isDate = prop === 'date';
    const parsed = isDate ? new Map(this.data.map(row => [row, parseListSortDate(row[prop])])) : null;

    this.externalSortData = [...this.data].sort((rowA, rowB) => {
      const a = parsed ? parsed.get(rowA) : rowA[prop];
      const b = parsed ? parsed.get(rowB) : rowB[prop];
      const result = defaultListSortComparator(a, b);
      return dir === 'desc' ? -result : result;
    });
  }

  onPageChangeVirtualScroll(event: number) {
    console.log('VIRTUALIZED EXAMPLE PAGE NUMBER: ', event);
  }

  onPageChange(event: number) {
    console.log('NON-VIRTUALIZED EXAMPLE PAGE NUMBER: ', event);
  }

  onNestedSelectionChange(event: ListSelectionEvent): void {
    console.log('NESTED SELECTION CHANGE: ', event);
  }

  onCascadeSelectionChange(event: ListSelectionEvent): void {
    if (!event.row) {
      this.cascadeSelectedIds = event.selectedIds;
      return;
    }

    const next = new Set(event.selectedIds);
    for (const id of this.getDescendantIds(event.row['id'] as ListRowId)) {
      if (event.selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
    }

    this.cascadeSelectedIds = Array.from(next);
  }

  onAlignedCascadeSelectionChange(event: ListSelectionEvent): void {
    this.alignedCascadeSelectedIds = event.selectedIds;
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }

  private getDescendantIds(parentId: ListRowId): ListRowId[] {
    const direct = this.cascadeData.filter(row => row['parentId'] === parentId).map(row => row['id'] as ListRowId);

    return direct.flatMap(id => [id, ...this.getDescendantIds(id)]);
  }

  private buildLargeNestedData(): Array<Record<string, unknown>> {
    const rows: Array<Record<string, unknown>> = [];
    for (let i = 0; i < 40; i++) {
      const solutionId = `sol-${i}`;
      rows.push({ id: solutionId, name: `Solution ${i}`, type: 'Solution' });
      for (let j = 0; j < 3; j++) {
        const appId = `${solutionId}-app-${j}`;
        rows.push({ id: appId, name: `Application ${i}.${j}`, type: 'Application', parentId: solutionId });
        rows.push({
          id: `${appId}-pb`,
          name: `Playbook ${i}.${j}`,
          type: 'Playbook',
          parentId: appId
        });
      }
    }
    return rows;
  }
}
