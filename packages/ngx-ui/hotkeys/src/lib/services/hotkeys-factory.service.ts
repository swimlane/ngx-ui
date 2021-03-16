import { Injectable } from '@angular/core';
import { HotkeysService } from './hotkeys.service';

@Injectable()
export class HotkeysFactoryService {
  static service: HotkeysService;

  constructor(service: HotkeysService) {
    HotkeysFactoryService.service = service;
  }
}
