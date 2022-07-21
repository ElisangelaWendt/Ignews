import {render, screen} from '@testing-library/react'
import { ActiveLink } from '.';

//toda vez que uma função estiver utilizando o next router, ele vai retornar
jest.mock('next/router', () => {
  return{
    useRouter(){
      return{
        //retorna um asPath que é vazio
        asPath: '/'
      }
    }
  }
})

//describe serve para descrever de qual componente os testes estão sendo realizados
describe('ActiveLinkComponent', () => {

  //pode ser usado o 'test' ou o 'it'
test('active link is receiving active class', () => {
 const { getByText } = render(
  <ActiveLink href="/" activeClassName='active'>
    <a>Home</a>
  </ActiveLink>
 )

//  debug()//gera um console.log com o HTML gerado

//o teste espera por um elemento chamado Home na tela e que ele esteja presente na renderização
expect(getByText("Home")).toBeInTheDocument()
})
//outra maneira de realizar o teste sem precisar desestrutar
test('active link is receiving active class', () => {
 render(
  <ActiveLink href="/" activeClassName='active'>
    <a>Home</a>
  </ActiveLink>
 )

//  debug()//gera um console.log com o HTML gerado

//espera que tenha uma classe active
expect(screen.getByText("Home")).toHaveClass("active")
})
});