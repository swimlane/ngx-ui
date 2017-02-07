import { PipeTransform } from '@angular/core';
/**
 * Filter Pipe
 * A pipe like the old-school ng1 pipe. Use this with
 * moderation since it has performance issues.
 *
 * References:
 *  - https://github.com/VadimDez/ng2-filter-pipe
 *  - https://angular.io/docs/ts/latest/guide/pipes.html
 *
 * Example:
 *
 *    <input type="text" [(ngModel)]="stringFilter">
 *    <ul>
 *      <li *ngFor="let item of array | filterBy: stringFilter"></li>
 *    </ul>
 *
 */
export declare class FilterPipe implements PipeTransform {
    transform(array: any[], filter: any): any;
    private filterByString(filter);
    private filterByObject(filter);
    /**
     * Defatul filterDefault function
     *
     * @param filter
     * @returns {(value:any)=>boolean}
     */
    private filterDefault(filter);
    private isNumber(value);
}
