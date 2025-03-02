describe('Central de Atendimento ao Cliente TAT', () => {

  //Ex 01.
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    Cypress._.times(2, () => {
      const longText = Cypress._.repeat('Teste', 20)
    
      cy.clock()
  
      cy.get('#firstName').type('Renan')
      cy.get('#lastName').type('Vicente')
      cy.get('#email').type('renanvicente@gmail.com')
      cy.get('#phone').type('99999999')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.contains('button', 'Enviar').click()
  
      cy.get('.success').should('be.visible')
  
      cy.tick(3000)
  
      cy.get('.success').should('not.be.visible')

    })

  })

  //Extra 02.
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.clock()
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Vicente')
    cy.get('#phone').type('99999999')
    cy.get('#email').type('testeEmailInvalido')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')

  })

  //Extra 03.
  it('numero com valor não numérico permanece vazio', () => {
    cy.get('#phone')
      .type('testeValorNaoNumerico')
      .should('have.value', '')
  })

  //Extra 04.
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.clock()
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Vicente')
    cy.get('#email').type('renanvicente@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')

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

    cy.clock()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')

  })

  //Extra 07.
  it('envia o formuário com sucesso usando um comando customizado' ,() => {
    cy.clock()
    const data = {
      firstName: "Renan",
      lastName: "Vicente",
      email: "renanvicente@gmail.com",
      text: "TESTE"
    }

    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
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

//----------------------------------------------------------------------------------------------------------------------------------------------
  //Ex 04.
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

//----------------------------------------------------------------------------------------------------------------------------------------------
  //Ex 05.
  it('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

//----------------------------------------------------------------------------------------------------------------------------------------------
  //Ex 06.
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  //Extra 01
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

//----------------------------------------------------------------------------------------------------------------------------------------------
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('GET', 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('desafio do gato', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'CAT')
  })
})