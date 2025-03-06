import { Component } from '@angular/core';
import { ListRowStatus } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  standalone: false
})
export class ListPageComponent {
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

  onPageChange(event: number) {
    console.log('PAGE NUMBER: ', event);
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
