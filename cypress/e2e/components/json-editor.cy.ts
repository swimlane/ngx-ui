describe('Json Editor', () => {
  before(() => {
    cy.visit('/json-editor');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  describe('JSON Editor', () => {
    it('Should have data', () => {
      cy.get('ngx-section').first().as('section1');
      cy.get('@section1').within(() => {
        cy.get('header h1').should('have.text', 'JSON Editor');
        cy.get('ngx-json-editor-node').should('exist');
      });
    });

    it('Should recognize binary format properties', () => {
      cy.get('ngx-section').first().as('section1');
      cy.get('@section1').within(() => {
        cy.get('ngx-json-object-node > div > div').eq(10).as('divContainerBinary');
        cy.get('@divContainerBinary').within(() => {
          cy.get('.property-def .title').should('contain.text', 'File Binary');
          cy.get('ngx-json-editor-node textarea').should('exist');
        });
      });
    });
  });

  describe('JSON Editor Flat', () => {
    it('Should have data', () => {
      cy.get('ngx-section').eq(1).as('section2');
      cy.get('@section2').within(() => {
        cy.get('header h1').should('have.text', 'ngx-json-editor-flat');
        cy.get('ngx-json-editor-flat').should('exist');
      });
    });

    it('Should recognize binary format properties', () => {
      cy.get('ngx-section').eq(1).as('section2');
      cy.get('@section2').within(() => {
        cy.get('ngx-json-editor-flat div.node').eq(11).as('divContainerBinary');
        cy.get('@divContainerBinary').within(() => {
          cy.get('ngx-json-editor-node-info').within(() => {
            cy.get('.name').should('contain', 'File Binary');
            cy.get('.type').should('contain', 'String');
          });
          cy.get('.node-input').within(() => {
            cy.get('textarea').should('exist');
          });
        });
      });
    });

    it('Should allow to add a property', () => {
      cy.get('ngx-section').eq(1).as('section2');

      cy.get('@section2').within(() => {
        cy.get('ngx-json-editor-flat').as('jsonEditorFlat');
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('.add-button')
            .last()
            .within(() => {
              cy.get('ngx-dropdown').as('addPropDropdown').scrollIntoView().should('be.visible');
              cy.get('@addPropDropdown').find('ngx-dropdown-toggle').should('contain.text', 'Add a property').click();
              cy.get('@addPropDropdown').find('ngx-dropdown-menu').should('exist');
            });
        });
      });
    });

    describe('Array', () => {
      beforeEach(() => {
        cy.get('ngx-section').eq(1).find('ngx-json-editor-flat').as('jsonEditorFlat');
      });
      it('Should allow to add a property of type array', () => {
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('ngx-dropdown-menu')
            .should('exist')
            .within(() => {
              cy.contains('li', 'Array').click();
            });
        });
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('ngx-dropdown-menu').should('not.be.visible');
        });
        cy.get('ngx-json-array-node-flat').should('exist');
      });

      it('should allow adding primitive items to newly created array property', () => {
        cy.get('ngx-json-array-node-flat')
          .scrollIntoView()
          .should('contain.text', 'Array')
          .within(() => {
            cy.get('.add-button')
              .should('be.visible')
              .within(() => {
                cy.get('ngx-dropdown-toggle').should('contain.text', 'Add an item').click();
              });
            cy.get('ngx-dropdown-menu')
              .should('be.visible')
              .within(() => {
                cy.contains('li', 'String').click();
              });
          });
        cy.get('ngx-json-array-node-flat')
          .should('exist')
          .within(() => {
            cy.get('.node-input ngx-input').should('exist').should('have.attr', 'type', 'textarea').ngxFill('test');
          });
      });

      it('should allow to remove an item on array property', () => {
        cy.get('ngx-json-array-node-flat').within(() => {
          cy.get('.node-options')
            .should('be.visible')
            .within(() => {
              cy.get('ngx-dropdown-toggle').should('be.visible').click();
            });
          cy.get('ngx-dropdown-menu')
            .should('be.visible')
            .within(() => {
              cy.contains('li', 'Delete').click();
            });
        });

        cy.get('ngx-json-array-node-flat').within(() => {
          cy.get('.node').should('have.length', 0);
        });
      });

      it('should allow adding objects as items to array property', () => {
        cy.get('ngx-json-array-node-flat').within(() => {
          cy.get('.add-button')
            .should('be.visible')
            .within(() => {
              cy.get('ngx-dropdown-toggle').should('contain.text', 'Add an item').click();
            });
          cy.get('ngx-dropdown-menu')
            .should('be.visible')
            .within(() => {
              cy.contains('li', 'Object').click();
            });
          cy.get('ngx-json-object-node-flat')
            .scrollIntoView()
            .should('exist')
            .within(() => {
              cy.get('.add-button')
                .should('be.visible')
                .within(() => {
                  cy.get('ngx-dropdown-toggle').should('contain.text', 'Add a property').click();
                });
              cy.get('ngx-dropdown-menu')
                .should('be.visible')
                .within(() => {
                  cy.contains('li', 'String').click();
                });

              cy.get('ngx-json-editor-node-info')
                .scrollIntoView()
                .find('ngx-input')
                .should('be.visible')
                .ngxFill('name');

              cy.get('.node-input ngx-input')
                .should('exist')
                .should('have.attr', 'type', 'textarea')
                .ngxFill('Swimlane User');
            });
        });
      });

      it('should allow adding another object with same props as array item', () => {
        cy.get('ngx-json-array-node-flat').within(() => {
          cy.get('.add-button')
            .should('be.visible')
            .within(() => {
              cy.get('ngx-dropdown-toggle').eq(1).should('contain.text', 'Add an item').click();
              cy.get('ngx-dropdown-menu')
                .eq(1)
                .scrollIntoView()

                .should('be.visible')
                .within(() => {
                  cy.contains('li', 'Object').click();
                });
            });

          cy.get('ngx-json-object-node-flat')
            .eq(1)
            .scrollIntoView()
            .should('exist')
            .within(() => {
              cy.get('.add-button')
                .should('be.visible')
                .within(() => {
                  cy.get('ngx-dropdown-toggle').should('contain.text', 'Add a property').click();
                  cy.get('ngx-dropdown-menu')
                    .should('be.visible')
                    .within(() => {
                      cy.contains('li', 'String').click();
                    });
                });

              cy.get('ngx-json-editor-node-info')
                .scrollIntoView()
                .find('ngx-input')
                .should('be.visible')
                .ngxFill('name');

              cy.get('.node-input ngx-input')
                .should('exist')
                .should('have.attr', 'type', 'textarea')
                .ngxFill('Swimlane Admin');
            });
        });
      });
    });

    describe('Custom input template', () => {
      beforeEach(() => {
        cy.get('ngx-section').eq(2).as('section3');
        cy.get('@section3').find('pre').eq(0).as('rootModelValue');
        cy.get('@section3').find('pre').eq(1).as('rootSchemaValue');
        cy.get('@section3').scrollIntoView();
      });
      describe('Template', () => {
        beforeEach(() => {
          cy.get('@section3').find('ngx-json-editor-flat div.node').eq(0).as('rootNode');
          cy.get('@rootNode').find('ngx-tabs').as('rootTabs');
        });
        it('Is Rending custom template', () => {
          cy.get('@rootNode').find('.myInputControlNodeContainer').should('exist').should('be.visible');
        });
        it('Checking initial values on root', () => {
          cy.get('@rootTabs').ngxSelectTab(0);
          cy.get('@rootTabs').find('.ngx-tab-content ngx-tab').eq(0).as('tabValue');
          cy.get('@tabValue').find('ngx-button').should('exist');

          cy.get('@rootTabs').ngxSelectTab(1);
          cy.get('@rootTabs').find('.ngx-tab-content ngx-tab').eq(1).as('tabModel');
          cy.get('@tabModel').should('contain', '{}');

          cy.get('@rootTabs').ngxSelectTab(2);
          cy.get('@rootTabs').find('.ngx-tab-content ngx-tab').eq(2).as('tabSchema');
          cy.get('@tabSchema')
            .find('.myInputControlNodeContainer__scrollable')
            .should('contain', '{\n  "type": "object",\n  "required": [],\n  "properties": {}\n}\n');

          cy.get('@rootTabs').ngxSelectTab(3);
          cy.get('@rootTabs').find('.ngx-tab-content ngx-tab').eq(3).as('tabContext');
          cy.get('@tabContext').should('contain', '{\n  "keyFieldType": "object",\n  "value": {}\n}\n');

          cy.get('@rootTabs').ngxSelectTab(4);
          cy.get('@rootTabs').find('.ngx-tab-content ngx-tab').eq(4).as('tabPath');
          cy.get('@tabPath').should('contain', '');
        });

        describe('Add and edit props', () => {
          beforeEach(() => {
            cy.get('@section3').find('ngx-json-editor-flat').as('jsonEditorFlat');
            cy.get('@jsonEditorFlat').find('.add-button').last().find('ngx-dropdown').as('addPropDropdown');
            cy.get('@addPropDropdown').scrollIntoView().should('be.visible');
          });
          describe('String prop', () => {
            it('Adding', () => {
              cy.get('@addPropDropdown').find('ngx-dropdown-toggle').should('contain.text', 'Add a property').click();
              cy.get('@addPropDropdown')
                .find('ngx-dropdown-menu')
                .should('exist')
                .within(() => {
                  cy.contains('li', 'String').click();
                });
            });

            describe('Checking', () => {
              beforeEach(() => {
                cy.get('@section3').find('ngx-json-editor-flat div.node').eq(1).as('stringNode');
                cy.get('@stringNode').find('ngx-tabs').as('stringTabs');
              });

              it('Checking initial values', () => {
                cy.get('@stringTabs').ngxSelectTab(0);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(0).as('tabValue');
                cy.get('@tabValue').find('input[type=text]').should('exist');
                cy.get('@tabValue').find('input[type=text]').should('have.value', '');

                cy.get('@stringTabs').ngxSelectTab(1);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(1).as('tabModel');
                cy.get('@tabModel').should('contain', '""');

                cy.get('@stringTabs').ngxSelectTab(2);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(2).as('tabSchema');
                cy.get('@tabSchema')
                  .find('.myInputControlNodeContainer__scrollable')
                  .should(
                    'contain',
                    '{\n  "type": "string",\n  "nameEditable": true,\n  "propertyName": "string",\n  "title": "String",\n'
                  );

                cy.get('@stringTabs').ngxSelectTab(3);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(3).as('tabContext');
                cy.get('@tabContext').should(
                  'contain',
                  '{\n  "key": "string",\n  "keyFieldType": "string",\n  "value": ""\n}\n'
                );

                cy.get('@stringTabs').ngxSelectTab(4);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(4).as('tabPath');
                cy.get('@tabPath').should('contain', '.string');
              });

              it('Modifying', () => {
                cy.get('@stringTabs').ngxSelectTab(0);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(0).as('tabValue');
                cy.get('@tabValue').find('input').type('abc');
              });

              it('Checking after modification', () => {
                cy.get('@stringTabs').scrollIntoView().ngxSelectTab(1);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(1).as('tabModel');
                cy.get('@tabModel').should('contain', '"abc"');

                cy.get('@stringTabs').ngxSelectTab(3);
                cy.get('@stringTabs').find('.ngx-tab-content ngx-tab').eq(3).as('tabContext');
                cy.get('@tabContext').should(
                  'contain',
                  '{\n  "key": "string",\n  "keyFieldType": "string",\n  "value": "abc"\n}\n'
                );
              });
            });
          });
          describe('Array prop', () => {
            it('Adding', () => {
              cy.get('@addPropDropdown').find('ngx-dropdown-toggle').should('contain.text', 'Add a property').click();
              cy.get('@addPropDropdown')
                .find('ngx-dropdown-menu')
                .should('exist')
                .within(() => {
                  cy.contains('li', 'Array').click();
                });
            });
            describe('Checking', () => {
              beforeEach(() => {
                cy.get('@section3').scrollIntoView().find('ngx-json-editor-flat div.node').eq(2).as('arrayNode');
                cy.get('@arrayNode').find('ngx-tabs').as('arrayTabs');
              });

              it('Checking initial values', () => {
                cy.get('@arrayTabs').ngxSelectTab(0);
                cy.get('@arrayTabs').ngxSelectTab(1);
                cy.get('@arrayTabs').find('.ngx-tab-content ngx-tab').eq(1).as('tabModel');
                cy.get('@tabModel').should('contain', '[]');

                cy.get('@arrayTabs').ngxSelectTab(2);
                cy.get('@arrayTabs').find('.ngx-tab-content ngx-tab').eq(2).as('tabSchema');
                cy.get('@tabSchema')
                  .find('.myInputControlNodeContainer__scrollable')
                  .should(
                    'contain',
                    '{\n  "type": "array",\n  "nameEditable": true,\n  "propertyName": "array",\n  "title": "Array",\n'
                  );

                cy.get('@arrayTabs').ngxSelectTab(3);
                cy.get('@arrayTabs').find('.ngx-tab-content ngx-tab').eq(3).as('tabContext');
                cy.get('@tabContext').should(
                  'contain',
                  '{\n  "key": "array",\n  "keyFieldType": "array",\n  "value": []\n}\n'
                );

                cy.get('@arrayTabs').ngxSelectTab(4);
                cy.get('@arrayTabs').find('.ngx-tab-content ngx-tab').eq(4).as('tabPath');
                cy.get('@tabPath').should('contain', '.array');
              });

              it('Modifying', () => {
                cy.get('@section3').find('ngx-json-array-node-flat .add-button ngx-dropdown').as('arrayPropDdl');
                cy.get('@arrayPropDdl').find('ngx-dropdown-toggle').click();
                cy.get('@arrayPropDdl')
                  .find('ngx-dropdown-menu')
                  .should('exist')
                  .within(() => {
                    cy.contains('li', 'Number').click();
                  });
              });

              it('Checking after modification', () => {
                cy.get('@section3').find('ngx-json-editor-flat div.node').eq(3).as('arraySub1Node');
                cy.get('@arraySub1Node').find('ngx-tabs').as('stringTabs');

                cy.get('@arraySub1Node').scrollIntoView().ngxSelectTab(1);
                cy.get('@arraySub1Node').find('.ngx-tab-content ngx-tab').eq(1).as('tabModel');
                cy.get('@tabModel').should('contain', '0');

                cy.get('@arraySub1Node').ngxSelectTab(2);
                cy.get('@arraySub1Node').find('.ngx-tab-content ngx-tab').eq(2).as('tabSchema');
                cy.get('@tabSchema')
                  .find('.myInputControlNodeContainer__scrollable')
                  .should('contain', '{\n  "type": "integer",\n');

                cy.get('@arraySub1Node').ngxSelectTab(3);
                cy.get('@arraySub1Node').find('.ngx-tab-content ngx-tab').eq(3).as('tabContext');
                cy.get('@tabContext').should('contain', '{\n  "keyFieldType": "integer",\n  "value": 0\n}\n');
              });
            });
          });
          describe('Check root schema and model sync', () => {
            it('Model', () => {
              cy.get('@rootModelValue').should('contain', '{\n  "string": "abc",\n  "array": [\n    0\n  ]\n}');
            });
            it('Schema', () => {
              const expected =
                '{\n  "type": "object",\n  "required": [],\n  "properties": {\n    "string": {\n      "type": "string",\n      "title": "String",\n      "nameEditable": true\n    },\n    "array": {\n      "type": "array",\n      "title": "Array",\n      "nameEditable": true\n    }\n  }\n}';
              cy.get('@rootSchemaValue').should('contain', expected);
            });
          });
        });
        describe('Remove props', () => {
          it('Removing array', () => {
            cy.get('@section3').scrollIntoView().find('ngx-json-editor-flat div.node').eq(2).as('arrayNode');
            cy.get('@arrayNode').find('.node-options ngx-dropdown').as('nodeOptions');
            cy.get('@nodeOptions').find('ngx-dropdown-toggle').click();
            cy.get('@nodeOptions')
              .find('ngx-dropdown-menu')
              .should('exist')
              .within(() => {
                cy.contains('li', 'Remove').click();
              });
          });
          describe('Check root schema and model sync', () => {
            it('Model', () => {
              cy.get('@rootModelValue').should('contain', '{\n  "string": "abc"\n}');
            });
            it('Schema', () => {
              const expected =
                '{\n  "type": "object",\n  "required": [],\n  "properties": {\n    "string": {\n      "type": "string",\n      "title": "String",\n      "nameEditable": true\n    }\n  }\n}';
              cy.get('@rootSchemaValue').should('contain', expected);
            });
          });
        });
        describe('Expand/Collapse', () => {
          beforeEach(() => {
            cy.get('@rootTabs').ngxSelectTab(0);
            cy.get('@rootTabs').find('.ngx-tab-content ngx-tab').eq(0).as('tabValue');
            cy.get('@section3').find('ngx-json-editor-flat div.node').eq(1).as('stringNode');
            cy.get('@tabValue').find('ngx-button').as('toggleButton');
          });
          it('Collapse', () => {
            cy.get('@stringNode').should('be.visible');
            cy.get('@toggleButton').should('contain', 'Collapse').click();
            cy.get('@stringNode').should('not.be.visible');
          });
          it('Expand', () => {
            cy.get('@stringNode').should('not.be.visible');
            cy.get('@toggleButton').should('contain', 'Expand').click();
            cy.get('@stringNode').should('be.visible');
          });
        });
      });
    });
  });

  describe('Schema Builder Mode', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(3).as('schemaBuilderMode');
    });
    it('should have data', () => {
      cy.get('@schemaBuilderMode').within(() => {
        cy.get('header h1').should('have.text', 'Schema Builder Mode');
      });
    });

    it('should allow adding a property', () => {
      cy.get('@schemaBuilderMode').within(() => {
        cy.get('ngx-json-editor-flat').as('jsonEditorFlat');
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('.add-button')
            .last()
            .within(() => {
              cy.get('ngx-dropdown').as('addPropDropdown').scrollIntoView().should('be.visible');
              cy.get('@addPropDropdown').find('ngx-dropdown-toggle').should('contain.text', 'Add a property').click();
              cy.get('@addPropDropdown').find('ngx-dropdown-menu').should('exist');
              cy.contains('li', 'Object').click();
            });
        });
      });
    });

    it('should allow modifying the property title', () => {
      cy.get('ngx-property-config').as('propertyConfig');
      cy.get('@propertyConfig').within(() => {
        cy.get('div.header>span').should('have.text', 'Property Configuration');
        cy.get('ngx-input').first().should('exist').ngxFill('obj_1');
        cy.get('button').contains('Apply').click();
      });
      cy.get('@schemaBuilderMode').within(() => {
        cy.get('ngx-json-editor-flat').as('jsonEditorFlat');
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('.info-name>span').first().should('contain.text', 'obj_1');
        });
      });
    });

    it('should allow adding a nested property', () => {
      cy.get('@schemaBuilderMode').within(() => {
        cy.get('ngx-json-editor-flat').first().as('jsonEditorFlat');
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('.add-button')
            .first()
            .within(() => {
              cy.get('ngx-dropdown').as('addPropDropdown').scrollIntoView().should('be.visible');
              cy.get('@addPropDropdown').find('ngx-dropdown-toggle').should('contain.text', 'Add a property').click();
              cy.get('@addPropDropdown').find('ngx-dropdown-menu').should('exist');
              cy.contains('li', 'String').click();
            });
        });
      });
    });

    it('should allow modifying the nested property title', () => {
      cy.get('ngx-property-config').as('propertyConfig');
      cy.get('@propertyConfig').within(() => {
        cy.get('div.header>span').should('have.text', 'Property Configuration');
        cy.get('ngx-input').first().should('exist').ngxFill('str_1');
        cy.get('button').contains('Apply').click();
      });
      cy.get('@schemaBuilderMode').within(() => {
        cy.get('ngx-json-editor-flat').as('jsonEditorFlat');
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('.info-name>span').last().should('contain.text', 'str_1');
        });
      });
    });

    it('should allow deleting nested a property', () => {
      cy.get('@schemaBuilderMode').within(() => {
        cy.get('.node-options')
          .last()
          .should('be.visible')
          .within(() => {
            cy.get('ngx-dropdown-toggle').should('be.visible').click();
            cy.contains('li', 'Remove').click();
          });
        cy.get('ngx-json-editor-flat').as('jsonEditorFlat');
        cy.get('@jsonEditorFlat').within(() => {
          cy.get('.info-name>span').last().should('not.contain.text', 'str_1');
        });
      });
    });
  });
});
