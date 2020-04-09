import * as faker from 'faker';

import { NotificationOptions } from './notification-options.interface';

export function notificationMock(opts?: NotificationOptions): { instance: NotificationOptions } {
  return {
    instance: {
      title: faker.random.word(),
      body: faker.random.words(10),
      timestamp: new Date().getTime(),
      ...opts
    }
  };
}
