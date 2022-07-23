const url = "http://localhost:3000";

describe('Тест конструктора бургеров', () => {
  it('Запуск сервера', () => {
    cy.visit(url);
  });

  it('Открытие и закрытие модалкии с ингредиентом', () => {
    cy.wait(3000);
    cy.get('[data-test="60d3b41abdacab0026a733d4"]').click();
    cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733d4');

    cy.get('[data-test="modal"]').should('exist');
    cy.wait(1000);
    cy.get('[data-test="close-modal"]').find('svg').click();
    cy.get('[data-test="modal"]').should('not.exist');

  });

  it('Перетаскивание ингредиентов из списка в конструктор', () => {
    const dataTransfer = new DataTransfer();

    cy.get('[data-test="60d3b41abdacab0026a733c7"]').trigger('dragstart', { dataTransfer });
    cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });

    cy.get('[data-test="60d3b41abdacab0026a733cf"]').trigger('dragstart', { dataTransfer });
    cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });

    cy.get('[data-test="60d3b41abdacab0026a733d4"]').trigger('dragstart', { dataTransfer });
    cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });
  });

  it('Проверка подсчета общей стоимости заказа', () => {
    cy.get('[data-test="total-price"]').should('contain', '6206');
  });

  it('Перенаправление на страницу логина', () => {
    cy.contains('Оформить заказ').should('be.enabled').click();
    cy.location('pathname').should('eq', '/login');

    cy.get('input[type=email]').click().type('st.krilius@ya.ru');
    cy.get('input[type=password]').click().type('test123');
    cy.contains('Войти').click();
  });

  it('Оформление заказа и открытие модалки', () => {
    cy.location('pathname').should('eq', '/');
    cy.contains('Оформить заказ').should('be.enabled').click();
    cy.get('[data-test="modal"]', { timeout: 16000 }).should('exist');
  });

  it('Закрытие модалки заказа', () => {
    cy.get('[data-test="close-modal"]').find('svg').click();
    cy.get('[data-test="modal"]').should('not.exist');
  });
});