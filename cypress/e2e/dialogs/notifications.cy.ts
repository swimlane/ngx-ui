describe('Notifications', () => {
  before(() => {
    cy.clock();
    cy.visit('/notification');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  beforeEach(() => {
    cy.get('ngx-tabs').first().ngxSelectTab(0);
  });

  afterEach(() => {
    cy.ngxCloseNotifications();
  });

  it('should display and close an info notification', () => {
    cy.get('button').contains('Type: Info').click();
    cy.get('.ngx-notification.ngx-notification-info').whileHovering(() => {
      cy.get('.ngx-notification-title').should('contain.text', 'Fatal Alert!');
      cy.get('.ngx-notification-body').should('contain.text', 'The system was compromised by hackers.');
    });
    cy.tick(5000);
    cy.get('.ngx-notification.ngx-notification-info').should('not.exist');
  });

  it('should display a success notification', () => {
    cy.get('button').contains('Type: Success').click();
    cy.get('.ngx-notification.ngx-notification-success').whileHovering(() => {
      cy.get('.ngx-notification-title').should('contain.text', 'Patch Applied!');
      cy.get('.ngx-notification-body').should('contain.text', 'Hackers have been stopped!');
      cy.get('.ngx-notification-close').click();
    });
    cy.get('.ngx-notification.ngx-notification-success').should('not.exist');
  });

  it('should close using testing lib', () => {
    cy.get('button').contains('Type: Success').click();
    cy.get('.ngx-notification.ngx-notification-success').ngxClose();
    cy.get('.ngx-notification.ngx-notification-success').should('not.exist');
  });

  it('should display a warning notification', () => {
    cy.get('button').contains('Type: Warning').click();
    cy.get('.ngx-notification.ngx-notification-warning').whileHovering(() => {
      cy.get('.ngx-notification-title').should('contain.text', 'Patch Unknown!');
      cy.get('.ngx-notification-body').should('contain.text', 'Jerrys patch was applied on some systems only.');
      cy.get('.ngx-notification-close').click();
    });
  });

  it('should display a error notification', () => {
    cy.get('button').contains('Type: Error').click();
    cy.get('.ngx-notification.ngx-notification-error').whileHovering(() => {
      cy.get('.ngx-notification-body').should('contain.text', 'Patch Failed!');
      cy.get('.ngx-notification-close').click();
    });
  });

  it('should display a custom notification', () => {
    cy.get('button').contains('Custom Icon').click();
    cy.get('.ngx-notification.ngx-notification-none')
      .last()
      .whileHovering(() => {
        cy.get('.ngx-notification-body').should('contain.text', 'Patch Failed!');
        cy.get('.ngx-notification-close').click();
      });
  });

  it('should display a notification', () => {
    cy.get('button').contains('No Type').click();
    cy.get('.ngx-notification.ngx-notification-none')
      .last()
      .whileHovering(() => {
        cy.get('.ngx-notification-title').should('contain.text', 'Patch Failed!');
        cy.get('.ngx-notification-close').click();
      });
  });

  it('should display multiple notifications', () => {
    cy.get('button').contains('Custom Icon').click();
    cy.get('button').contains('No Type').click();
    cy.get('button').contains('Type: Error').click();
    cy.get('ngx-notification').should('have.length', 3);
  });
});
