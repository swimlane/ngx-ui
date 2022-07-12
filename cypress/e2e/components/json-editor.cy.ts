describe('Json Editor', () => {
  before(() => {
    cy.visit('/json-editor');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
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
  });
});
