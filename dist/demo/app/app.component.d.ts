import { TemplateRef, ViewContainerRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { DrawerService } from '../../src/components/drawer';
import { DialogService, AlertService } from '../../src/components/dialog';
import { NotificationService } from '../../src/components/notification';
import { InjectionService } from '../../src/services/injection.service';
import { LoadingService } from '../../src/components/loading';
export declare class AppComponent {
    viewContainerRef: ViewContainerRef;
    drawerMngr: DrawerService;
    dialogMngr: DialogService;
    notificationService: NotificationService;
    injectionService: InjectionService;
    alertService: AlertService;
    loadingService: LoadingService;
    version: string;
    editTmpl: TemplateRef<any>;
    dialogTpl: TemplateRef<any>;
    tooltipModel: {
        text: string;
    };
    chars: string;
    nums: string;
    letters: string;
    lettersLower: string;
    dynamicVal: string;
    colors: string[];
    chartColorsOrdinal: {
        name: string;
        colors: string[];
    }[];
    chartColorsSequential: {
        name: string;
        colors: string[];
    }[];
    selects: any[];
    icons: any;
    toggleChk: boolean;
    code: string;
    curDate: any;
    minDate: any;
    maxDate: any;
    invalidDate: any;
    emptyDate: any;
    editorResult: any;
    numericValue: any;
    inputValue: any;
    inputValue1: any;
    inputValue2: any;
    inputValue3: any;
    usernameValue: any;
    passwordValue: any;
    shown: any;
    output: any;
    curDate2: any;
    sliderEvent1: any;
    sliderEvent2: any;
    sliderEvent3: any;
    sliderEvent4: any;
    sliderEvent5: any;
    sliderEvent6: any;
    sliderEvent7: any;
    sliderEvent8: any;
    dialogVis: any;
    state: any;
    editorConfig: {
        lineNumbers: boolean;
        theme: string;
        mode: {
            name: string;
            json: boolean;
        };
    };
    sliderValue: number;
    gradients: string[];
    toolbarMenu: ({
        label: string;
        click: () => void;
    } | {
        label: string;
        disabled: boolean;
    })[];
    rows: any[];
    shadows: any[];
    uploadOptions: {
        url: string;
        autoUpload: boolean;
    };
    uploaderInstance: FileUploader;
    deps: any;
    nodes: any[];
    nodes1: any[];
    jsonObject: any;
    constructor(viewContainerRef: ViewContainerRef, drawerMngr: DrawerService, dialogMngr: DialogService, notificationService: NotificationService, injectionService: InjectionService, alertService: AlertService, loadingService: LoadingService);
    getHex(scssVar: any): any;
    dateChanged(val: any): void;
    setTheme(theme: any): void;
    openDrawer(direction?: string, size?: any): void;
    openDialog(options: any): void;
    menuClicked(event: any): void;
    onToggleChange(event: any): void;
    onSelectKeyUp(event: any): void;
    onPromptClick(): void;
}
