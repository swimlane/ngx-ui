/// <reference types="core-js" />
export declare class RegistryService {
    components: Map<{}, {}>;
    register(id: string, component: any, destroyCallback?: any): void;
    get(id: string): any;
    destroy(id: string): void;
    destroyAll(): void;
}
