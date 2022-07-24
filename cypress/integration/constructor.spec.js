const url = "http://localhost:3000";

describe('Тест конструктора бургеров', () => {
  it('Запуск сервера', () => {
    cy.visit(url);
  });

  it('Открытие и закрытие модалкии с ингредиентом', () => {
    cy.get('[data-test="60d3b41abdacab0026a733d4"]', {timeout: 3000}).click({force: true});
    cy.location('pathname').should('eq', '/react-burger/ingredients/60d3b41abdacab0026a733d4');

    cy.get('[data-test="modal"]').should('exist');

    cy.get('[data-test="close-modal"]', {timeout: 1000}).find('svg').click({force: true});
    cy.get('[data-test="modal"]').should('not.exist');

  });

  it('Перетаскивание ингредиентов из списка в конструктор', () => {
    const dataTransfer = new DataTransfer();

    cy.get('[data-test="60d3b41abdacab0026a733c7"]', {timeout: 1000}).trigger('dragstart', { dataTransfer });
    cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });

    cy.get('[data-test="60d3b41abdacab0026a733cf"]').trigger('dragstart', { dataTransfer });
    cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });

    cy.get('[data-test="tabs"]').contains('Начинки').click();

    cy.get('[data-test="60d3b41abdacab0026a733d4"]').trigger('dragstart', { dataTransfer });
    cy.get('[data-test="constructor"]').trigger('drop', { dataTransfer });
  });

  it('Проверка подсчета общей стоимости заказа', () => {
    cy.get('[data-test="total-price"]').should('contain', '6206');
  });

  it('Перенаправление на страницу логина', () => {
    cy.contains('Оформить заказ').should('be.enabled').click({force: true});
    cy.location('pathname').should('eq', '/react-burger/login');

    cy.get('input[type=email]').click({force: true}).type('st.krilius@ya.ru');
    cy.get('input[type=password]').click({force: true}).type('test123');
    cy.contains('Войти').click({force: true});
  });

  it('Оформление заказа и открытие модалки', () => {
    cy.location('pathname').should('eq', '/react-burger/');
    cy.contains('Оформить заказ').should('be.enabled').click({force: true});
    cy.get('[data-test="modal"]', { timeout: 16000 }).should('exist');
  });

  it('Закрытие модалки заказа', () => {
    cy.get('[data-test="close-modal"]').find('svg').click({force: true});
    cy.get('[data-test="modal"]').should('not.exist');
  });
});