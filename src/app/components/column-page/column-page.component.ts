import { Component } from '@angular/core';
import { Column } from '@swimlane/ngx-ui';
import { ColumnTestContentComponent } from './column-test.component';

@Component({
  selector: 'app-column-page',
  templateUrl: './column-page.component.html',
  standalone: false
})
export class ColumnPageComponent {
  column: Column = {
    id: '1a',
    active: true,
    title: 'Column 1a',
    children: [
      {
        id: '1b',
        active: true,
        title: 'Column 1b',
        children: [
          {
            id: '1c',
            active: true,
            title: 'Column 1c',
            children: [
              {
                id: '1d',
                active: false,
                title: 'Column 1d',
                content: {
                  component: ColumnTestContentComponent,
                  options: {}
                }
              },
              {
                id: '1e',
                active: false,
                title: 'Column 1e',
                children: [
                  {
                    id: '1f',
                    active: false,
                    title: 'Column 1f',
                    children: [
                      {
                        id: '1g',
                        active: false,
                        title: 'Column 1g',
                        content: {
                          component: ColumnTestContentComponent,
                          options: {}
                        }
                      },
                      {
                        id: '1h',
                        active: false,
                        title: 'Column 1h',
                        content: {
                          component: ColumnTestContentComponent,
                          options: {}
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '2a',
        active: false,
        title: 'Column 2a',
        children: [
          {
            id: '2b',
            active: false,
            title: 'Column 2b',
            children: [
              {
                id: '2c',
                active: false,
                title: 'Column 2c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '3a',
        active: false,
        title: 'Column 3a',
        children: [
          {
            id: '3b',
            active: false,
            title: 'Column 3b',
            children: [
              {
                id: '3d',
                active: true,
                title: 'Column 3d',
                children: [
                  {
                    id: '3e',
                    active: true,
                    title: 'Column 3e',
                    children: [
                      {
                        id: '3f',
                        active: false,
                        title: 'Column 3f',
                        content: {
                          component: ColumnTestContentComponent,
                          options: {}
                        }
                      },
                      {
                        id: '3g',
                        active: false,
                        title: 'Column 3g',
                        children: [
                          {
                            id: '3h',
                            active: false,
                            title: 'Column 3h',
                            children: [
                              {
                                id: '3i',
                                active: false,
                                title: 'Column 3i',
                                content: {
                                  component: ColumnTestContentComponent,
                                  options: {}
                                }
                              },
                              {
                                id: '3j',
                                active: false,
                                title: 'Column 3j',
                                content: {
                                  component: ColumnTestContentComponent,
                                  options: {}
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: '3w',
                active: false,
                title: 'Column 3w',
                children: [
                  {
                    id: '3u',
                    active: false,
                    title: 'Column 3u',
                    children: [
                      {
                        id: '3t',
                        active: false,
                        title: 'Column 3t',
                        content: {
                          width: '1200px',
                          component: ColumnTestContentComponent
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: '3x',
                active: false,
                title: 'Column 3x',
                children: [
                  {
                    id: '3y',
                    active: false,
                    title: 'Column 3y',
                    children: [
                      {
                        id: '3z',
                        active: false,
                        title: 'Column 3z',
                        content: {
                          component: ColumnTestContentComponent
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: '3m',
                active: false,
                title: 'Column 3m',
                children: [
                  {
                    id: '3n',
                    active: false,
                    title: 'Column 3n',
                    children: [
                      {
                        id: '3o',
                        active: false,
                        title: 'Column 3o',
                        content: {
                          component: ColumnTestContentComponent
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: '3p',
                active: false,
                title: 'Column 3p',
                children: [
                  {
                    id: '3q',
                    active: false,
                    title: 'Column 3q',
                    children: [
                      {
                        id: '3r',
                        active: false,
                        title: 'Column 3r',
                        content: {
                          component: ColumnTestContentComponent
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: '3s',
                active: false,
                title: 'Column 3s',
                children: [
                  {
                    id: '3t',
                    active: false,
                    title: 'Column 3t',
                    content: {
                      component: ColumnTestContentComponent
                    }
                  }
                ]
              },
              {
                id: '3k',
                active: false,
                title: 'Column 3k',
                children: [
                  {
                    id: '3l',
                    active: false,
                    title: 'Column 3l',
                    content: {
                      component: ColumnTestContentComponent
                    }
                  }
                ]
              },
              {
                id: '13a',
                active: false,
                title: 'Column 13a',
                children: [
                  {
                    id: '13b',
                    active: false,
                    title: 'Column 13b',
                    children: [
                      {
                        id: '13c',
                        active: false,
                        title: 'Column 13c',
                        content: {
                          component: ColumnTestContentComponent
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '4a',
        active: false,
        title: 'Column 4a',
        children: [
          {
            id: '4b',
            active: false,
            title: 'Column 4b',
            children: [
              {
                id: '4c',
                active: false,
                title: 'Column 4c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '5a',
        active: false,
        title: 'Column 5a',
        children: [
          {
            id: '5b',
            active: false,
            title: 'Column 4b',
            children: [
              {
                id: '5c',
                active: false,
                title: 'Column 5c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '6a',
        active: false,
        title: 'Column 6a',
        children: [
          {
            id: '6b',
            active: false,
            title: 'Column 6b',
            children: [
              {
                id: '6c',
                active: false,
                title: 'Column 6c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '7a',
        active: false,
        title: 'Column 7a',
        children: [
          {
            id: '7b',
            active: false,
            title: 'Column 7b',
            children: [
              {
                id: '7c',
                active: false,
                title: 'Column 7c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '8a',
        active: false,
        title: 'Column 8a',
        children: [
          {
            id: '8b',
            active: false,
            title: 'Column 8b',
            children: [
              {
                id: '8c',
                active: false,
                title: 'Column 8c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '9a',
        active: false,
        title: 'Column 9a',
        children: [
          {
            id: '9b',
            active: false,
            title: 'Column 9b',
            children: [
              {
                id: '9c',
                active: false,
                title: 'Column 9c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '10a',
        active: false,
        title: 'Column 10a',
        children: [
          {
            id: '10b',
            active: false,
            title: 'Column 10b',
            children: [
              {
                id: '10c',
                active: false,
                title: 'Column 10c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '11',
        active: false,
        title: 'Column 11a',
        children: [
          {
            id: '11b',
            active: false,
            title: 'Column 11b',
            children: [
              {
                id: '11c',
                active: false,
                title: 'Column 11c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      },
      {
        id: '12',
        active: false,
        title: 'Column 12a',
        children: [
          {
            id: '12b',
            active: false,
            title: 'Column 12b',
            children: [
              {
                id: '12c',
                active: false,
                title: 'Column 12c',
                content: {
                  component: ColumnTestContentComponent
                }
              }
            ]
          }
        ]
      }
    ]
  };

  columnExample: Column = {
    id: '1a',
    active: true,
    title: 'Column 1a',
    children: [
      {
        id: '1b',
        active: true,
        title: 'Column 1b',
        children: [
          {
            id: '1c',
            active: true,
            title: 'Column 1c',
            content: {
              component: 'ColumnTestContentComponent',
              options: {}
            }
          }
        ]
      },
      {
        id: '2a',
        active: false,
        title: 'Column 2a',
        children: [
          {
            id: '2b',
            active: false,
            title: 'Column 2b',
            children: [
              {
                id: '2c',
                active: false,
                title: 'Column 2c',
                content: {
                  component: 'ColumnTestContentComponent',
                  options: {}
                }
              }
            ]
          }
        ]
      }
    ]
  };

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
