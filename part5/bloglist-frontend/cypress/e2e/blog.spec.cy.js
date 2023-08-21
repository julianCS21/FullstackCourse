



describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login with your account')
      cy.contains('Username :')
      cy.contains('Password :')
      cy.contains('login')
      
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('juliancs21')
        cy.get('#password').type('1234567')
        cy.get('#submitLogin').click()

        cy.contains('juliancs21')
        cy.contains('Blogs')

      })
  
      it('fails with wrong credentials', function() {
        cy.contains()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#submitLogin').click()

        cy.contains('Username or Password incorrect')

        // ...
      })
    })

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('juliancs21')
        cy.get('#password').type('1234567')
        cy.get('#submitLogin').click()
        
      })
  
      it('A blog can be created', function() {
        cy.get('#newBlog').click()
        cy.get('#title').type('prueba')
        cy.get('#author').type('hpd')
        cy.get('#url').type('31231321')
        cy.get('#BlogSubmit').click()
        cy.contains('prueba')

      })

      

  })

  describe.only('the user can give a like',function(){
    beforeEach(function() {
      cy.get('#username').type('juliancs21')
      cy.get('#password').type('1234567')
      cy.get('#submitLogin').click()
      cy.get('#newBlog').click()
      cy.get('#title').type('prueba')
      cy.get('#author').type('hpd')
      cy.get('#url').type('31231321')
      cy.get('#BlogSubmit').click()
    })

    it('A user can give a like',function () {
      cy.get('#view').click()
      cy.contains('0')
        .contains('like')
        .click()

    })



  })


  describe.only('the user can delete his blogs',function(){
    beforeEach(function() {
      cy.get('#username').type('juliancs21')
      cy.get('#password').type('1234567')
      cy.get('#submitLogin').click()
      cy.get('#newBlog').click()
      cy.get('#title').type('prueba')
      cy.get('#author').type('hpd')
      cy.get('#url').type('31231321')
      cy.get('#BlogSubmit').click()
    })

    it('A user cant delete',function () {
      cy.get('#view').click()
      cy.contains('delete')
        .click()

      cy.contains('this blog has been eliminated')

    })



  })


  describe.only('the user cant delete others blogs',function(){
    beforeEach(function() {
      cy.get('#username').type('juliancs21')
      cy.get('#password').type('1234567')
      cy.get('#submitLogin').click()
      cy.get('#newBlog').click()
      cy.get('#title').type('prueba')
      cy.get('#author').type('hpd')
      cy.get('#url').type('31231321')
      cy.get('#BlogSubmit').click()
      cy.get('#logOut').click()
      cy.get('#username').type('nicolascs19')
      cy.get('#password').type('1234567')
      cy.get('#submitLogin').click()
    })

    it('A user cant delete',function () {
      cy.get('#view').click()
      cy.contains('delete')
        .click()
      

      cy.contains('Error, this blog hasnt been eliminated')

    })
  })
    

    describe.only('blogs must be in descending order',function(){
    beforeEach(function() {
      cy.get('#username').type('juliancs21')
      cy.get('#password').type('1234567')
      cy.get('#submitLogin').click()
      cy.get('#newBlog').click()
      cy.get('#title').type('prueba')
      cy.get('#author').type('hpd')
      cy.get('#url').type('31231321')
      cy.get('#BlogSubmit').click()
      cy.get('#view').click()
      cy.contains('0')
        .contains('like')
        .click()
      cy.get('#title').type('prueba2')
      cy.get('#author').type('hpd2')
      cy.get('#url').type('312313212')
      cy.get('#BlogSubmit').click()
      cy.get('#logOut').click()
      cy.get('#username').type('nicolascs19')
      cy.get('#password').type('1234567')
      cy.get('#submitLogin').click()
    })

    it('Blogs in descending order',function () {
      cy.get('.blog').eq(0).should('contain', 'prueba')
      cy.get('.blog').eq(1).should('contain', 'pruebaprueba2')
    })
  })
})


