export interface ListPaginationConfig {
  /**
   * The number of rows per page
   */
  pageSize: number;

  /**
   * The page to start on when the list is rendered
   * Only supported when virtual scroll is disabled
   */
  index?: number;
}
