import { ProductsPage } from "../support/Pages/productsPage";
import { HomePage } from "../support/Pages/homePage";

describe('template spec', () => {
  let productos;
  const productPage = new ProductsPage();
  const homePage = new HomePage();


  before(()=>{
    cy.login(Cypress.env().usuario, Cypress.env().password);
    cy.visit('');
    cy.fixture("../fixtures/products").then(data=>{
      productos=data
    })

  })
  after(()=>{
    cy.eliminarProducto(productos.product.id);
  })

  it('Editar producto y verificar los datos', () => {
    cy.eliminarProducto(productos.product.id);
    cy.crearProducto(productos.product);
    cy.editarProducto(productos.productEdited);
    homePage.clickOnlineShop();
    productPage.selectFilterById()
    productPage.filterProductById(productos.product.id)
    cy.get(productPage.productName).contains(productos.productEdited.name).should('have.length', 1)
    cy.get(productPage.productPrice).contains(productos.productEdited.price).should('have.length', 1)
    cy.wait(10000)

  })
})