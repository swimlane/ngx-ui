import { Component } from '@angular/core';
import { ListRowStatus } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  standalone: false
})
export class ListPageComponent {
  data = [
    {
      id: 1,
      alert: 'Playbook B has failed',
      timestamp: '11:00:00 UTC',
      info: 'Critical error in execution step',
      details: {
        link: '/playbook/B',
        text: 'Open playbook'
      }
    },
    {
      id: 2,
      alert: 'Flow A in Playbook C has failed',
      timestamp: '10:45:23 UTC',
      info: 'Network timeout',
      details: {
        link: '/run/sdjhfkakkjsdfh',
        text: 'Run ID: sdjhfkakkjsdfh',
        runId: 'sdjhfkakkjsdfh'
      }
    },
    {
      id: 3,
      alert: 'Playbook E was disabled due to infinite loop',
      timestamp: '10:30:15 UTC',
      info: 'Automation safety trigger',
      details: {
        link: '/playbook/E',
        text: 'Open playbook'
      }
    },
    {
      id: 4,
      alert: 'Playbook A has failed',
      timestamp: '10:15:45 UTC',
      info: 'Missing required parameters',
      details: {
        link: '/playbook/A',
        text: 'Open playbook'
      }
    },
    {
      id: 5,
      alert: 'Playbook D has timed out',
      timestamp: '10:00:00 UTC',
      info: 'Execution exceeded 30min limit',
      details: {
        link: '/playbook/D',
        text: 'Open playbook'
      }
    },
    {
      id: 6,
      alert: 'Flow C in Playbook A has failed',
      timestamp: '09:45:30 UTC',
      info: 'API rate limit exceeded',
      details: {
        link: '/run/kdjfh3kjhsdf',
        text: 'Run ID: kdjfh3kjhsdf',
        runId: 'kdjfh3kjhsdf'
      }
    },
    {
      id: 7,
      alert: 'Playbook F execution cancelled',
      timestamp: '09:30:00 UTC',
      info: 'Manual cancellation',
      details: {
        link: '/playbook/F',
        text: 'Open playbook'
      }
    },
    {
      id: 8,
      alert: 'Flow B in Playbook D has failed',
      timestamp: '09:15:45 UTC',
      info: 'Invalid input data',
      details: {
        link: '/run/sdkjfh45kjhsdf',
        text: 'Run ID: sdkjfh45kjhsdf',
        runId: 'sdkjfh45kjhsdf'
      }
    },
    {
      id: 9,
      alert: 'Playbook G has failed',
      timestamp: '09:00:00 UTC',
      info: 'Database connection error',
      details: {
        link: '/playbook/G',
        text: 'Open playbook'
      }
    },
    {
      id: 10,
      alert: 'Scheduled execution of Playbook H failed',
      timestamp: '08:45:15 UTC',
      info: 'Environment configuration error',
      details: {
        link: '/playbook/H',
        text: 'Open playbook'
      }
    },
    {
      id: 1,
      alert: 'Playbook B has failed',
      timestamp: '11:00:00 UTC',
      info: 'Critical error in execution step',
      details: {
        link: '/playbook/B',
        text: 'Open playbook'
      }
    },
    {
      id: 2,
      alert: 'Flow A in Playbook C has failed',
      timestamp: '10:45:23 UTC',
      info: 'Network timeout',
      details: {
        link: '/run/sdjhfkakkjsdfh',
        text: 'Run ID: sdjhfkakkjsdfh',
        runId: 'sdjhfkakkjsdfh'
      }
    },
    {
      id: 3,
      alert: 'Playbook E was disabled due to infinite loop',
      timestamp: '10:30:15 UTC',
      info: 'Automation safety trigger',
      details: {
        link: '/playbook/E',
        text: 'Open playbook'
      }
    },
    {
      id: 4,
      alert: 'Playbook A has failed',
      timestamp: '10:15:45 UTC',
      info: 'Missing required parameters',
      details: {
        link: '/playbook/A',
        text: 'Open playbook'
      }
    },
    {
      id: 5,
      alert: 'Playbook D has timed out',
      timestamp: '10:00:00 UTC',
      info: 'Execution exceeded 30min limit',
      details: {
        link: '/playbook/D',
        text: 'Open playbook'
      }
    },
    {
      id: 6,
      alert: 'Flow C in Playbook A has failed',
      timestamp: '09:45:30 UTC',
      info: 'API rate limit exceeded',
      details: {
        link: '/run/kdjfh3kjhsdf',
        text: 'Run ID: kdjfh3kjhsdf',
        runId: 'kdjfh3kjhsdf'
      }
    },
    {
      id: 7,
      alert: 'Playbook F execution cancelled',
      timestamp: '09:30:00 UTC',
      info: 'Manual cancellation',
      details: {
        link: '/playbook/F',
        text: 'Open playbook'
      }
    },
    {
      id: 8,
      alert: 'Flow B in Playbook D has failed',
      timestamp: '09:15:45 UTC',
      info: 'Invalid input data',
      details: {
        link: '/run/sdkjfh45kjhsdf',
        text: 'Run ID: sdkjfh45kjhsdf',
        runId: 'sdkjfh45kjhsdf'
      }
    },
    {
      id: 9,
      alert: 'Playbook G has failed',
      timestamp: '09:00:00 UTC',
      info: 'Database connection error',
      details: {
        link: '/playbook/G',
        text: 'Open playbook'
      }
    },
    {
      id: 10,
      alert: 'Scheduled execution of Playbook H failed',
      timestamp: '08:45:15 UTC',
      info: 'Environment configuration error',
      details: {
        link: '/playbook/H',
        text: 'Open playbook'
      }
    },
    {
      id: 1,
      alert: 'Playbook B has failed',
      timestamp: '11:00:00 UTC',
      info: 'Critical error in execution step',
      details: {
        link: '/playbook/B',
        text: 'Open playbook'
      }
    },
    {
      id: 2,
      alert: 'Flow A in Playbook C has failed',
      timestamp: '10:45:23 UTC',
      info: 'Network timeout',
      details: {
        link: '/run/sdjhfkakkjsdfh',
        text: 'Run ID: sdjhfkakkjsdfh',
        runId: 'sdjhfkakkjsdfh'
      }
    },
    {
      id: 3,
      alert: 'Playbook E was disabled due to infinite loop',
      timestamp: '10:30:15 UTC',
      info: 'Automation safety trigger',
      details: {
        link: '/playbook/E',
        text: 'Open playbook'
      }
    },
    {
      id: 4,
      alert: 'Playbook A has failed',
      timestamp: '10:15:45 UTC',
      info: 'Missing required parameters',
      details: {
        link: '/playbook/A',
        text: 'Open playbook'
      }
    },
    {
      id: 5,
      alert: 'Playbook D has timed out',
      timestamp: '10:00:00 UTC',
      info: 'Execution exceeded 30min limit',
      details: {
        link: '/playbook/D',
        text: 'Open playbook'
      }
    },
    {
      id: 6,
      alert: 'Flow C in Playbook A has failed',
      timestamp: '09:45:30 UTC',
      info: 'API rate limit exceeded',
      details: {
        link: '/run/kdjfh3kjhsdf',
        text: 'Run ID: kdjfh3kjhsdf',
        runId: 'kdjfh3kjhsdf'
      }
    },
    {
      id: 7,
      alert: 'Playbook F execution cancelled',
      timestamp: '09:30:00 UTC',
      info: 'Manual cancellation',
      details: {
        link: '/playbook/F',
        text: 'Open playbook'
      }
    },
    {
      id: 8,
      alert: 'Flow B in Playbook D has failed',
      timestamp: '09:15:45 UTC',
      info: 'Invalid input data',
      details: {
        link: '/run/sdkjfh45kjhsdf',
        text: 'Run ID: sdkjfh45kjhsdf',
        runId: 'sdkjfh45kjhsdf'
      }
    },
    {
      id: 9,
      alert: 'Playbook G has failed',
      timestamp: '09:00:00 UTC',
      info: 'Database connection error',
      details: {
        link: '/playbook/G',
        text: 'Open playbook'
      }
    },
    {
      id: 10,
      alert: 'Scheduled execution of Playbook H failed',
      timestamp: '08:45:15 UTC',
      info: 'Environment configuration error',
      details: {
        link: '/playbook/H',
        text: 'Open playbook'
      }
    }
  ];

  layout: Partial<CSSStyleDeclaration> = {
    // display: 'grid',
    gridTemplateColumns: '4fr 1fr 1fr 1fr'
    // gap: '1rem'
  };

  paginationConfig = {
    pageSize: 10,
    index: 2
  };

  rowStatus: ListRowStatus = ListRowStatus.Error;

  onPageChange(event: number) {
    console.log(event);
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
