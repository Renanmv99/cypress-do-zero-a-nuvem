describe('Central de Atendimento ao Cliente TAT', () => {

  //Ex 01.
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Teste', 20)

    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Vicente')
    cy.get('#email').type('renanvicente@gmail.com')
    cy.get('#phone').type('99999999')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  //Extra 02.
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Vicente')
    cy.get('#phone').type('99999999')
    cy.get('#email').type('testeEmailInvalido')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  //Extra 03.
  it('numero com valor não numérico permanece vazio', () => {
    cy.get('#phone')
      .type('testeValorNaoNumerico')
      .should('have.value', '')
  })

  //Extra 04.
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Vicente')
    cy.get('#email').type('renanvicente@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  //Extra 05.
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Renan')
      .should('have.value', 'Renan')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Vicente')
      .should('have.value', 'Vicente')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('99999999')
      .should('have.value', '99999999')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('renanvicente@gmail.com')
      .should('have.value', 'renanvicente@gmail.com')
      .clear()
      .should('have.value', '')
  })

  //Extra 06.
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  //Extra 07.
  it('envia o formuário com sucesso usando um comando customizado' ,() => {
    const data = {
      firstName: "Renan",
      lastName: "Vicente",
      email: "renanvicente@gmail.com",
      text: "TESTE"
    }

    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
  })

//----------------------------------------------------------------------------------------------------------------------------------------------
  
  //Ex 02.
  it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
  })

  //Extra 01
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.contains('select', 'Mentoria')
      .select('Mentoria')
      .should('have.value', "mentoria")
  })

  //Extra 02
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

//----------------------------------------------------------------------------------------------------------------------------------------------

  //Ex 03.
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type=radio][value="feedback"]')
      .check()
      .should('be.checked')
  })

  //Extra 01
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type=radio]')
      .each( typeofService => {
        cy.wrap(typeofService)
          .check()
          .should('be.checked')
      })
  })
})