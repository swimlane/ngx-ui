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
  });
});
