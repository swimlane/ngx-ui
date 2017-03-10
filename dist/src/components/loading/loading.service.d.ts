import { InjectionService } from '../../services';
export declare class LoadingService {
    private injectionService;
    threshold: number;
    progress: number;
    private readonly instance;
    private count;
    private timeout;
    private component;
    private _progress;
    constructor(injectionService: InjectionService);
    start(autoIncrement?: boolean): void;
    stop(): void;
    reset(num?: number): void;
    complete(all?: boolean): void;
    hide(): void;
    private create();
    private increment();
}
