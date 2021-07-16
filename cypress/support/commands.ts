// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>

Cypress.Commands.add('navigate', (url, options = {}) => {
  return cy.window().then($win => {
    // No page loaded, visit
    if (options.forceReload || !$win.location.href.startsWith(Cypress.config('baseUrl'))) {
      cy.log('Visit');
      cy.visit(url, options);
      return cy.get('.page-loader').should('not.exist', { timeout: 20000 });
    }

    if (!url || url === '') {
      cy.log('Reload');
      cy.reload();
      return cy.get('.page-loader').should('not.exist', { timeout: 20000 });
    }

    // Already on this page, navigate away then back, fater than visit or reload
    if ($win.location.href === Cypress.config('baseUrl') + url) {
      cy.log('Refresh');
      return navByLink('/').then(() => {
        return navByLink(url);
      });
    }

    return navByLink(url);

    // Equivalent to navigating by link
    function navByLink(url) {
      cy.log('navByLink');
      return cy.document().then($doc => {
        var a = $doc.createElement('a');
        a.href = url;
        $doc.body.appendChild(a);
        a.click();
        $doc.body.removeChild(a);
      });
    }
  });
});

Cypress.Commands.add('dataCy', value => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('asAllDataCy', () =>
  cy.get('[data-cy]').then(list => {
    list.each((i, { dataset: { cy: name } }) => {
      cy.dataCy(name).as(name);
    });
  })
);
