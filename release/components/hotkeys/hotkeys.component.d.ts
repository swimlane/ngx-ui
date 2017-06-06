import { HotkeysService } from './hotkeys.service';
export declare class HotkeysComponent {
    private hotkeysService;
    hotkeys: any[];
    showHotkeys: boolean;
    constructor(hotkeysService: HotkeysService);
    updateHotkeys(hotkeys: any): void;
    handleKeyboardEvent(event: any): boolean;
    show(): void;
    hide(): void;
}
