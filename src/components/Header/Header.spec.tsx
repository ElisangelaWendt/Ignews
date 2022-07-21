import {render} from '@testing-library/react'
import { Header } from '.';

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

//como um dos componentes do header utiliza o next auth client, é necessário fazer um mock para ele também
jest.mock('next-auth/react', () => {
  return{
    //dentro dessa biblioteca, quando tiver uma importação do useSession
    useSession(){
      //essa função irá retornar um array com nulo e falso
      return[null, false]
    }
  }
})

//describe serve para descrever de qual componente os testes estão sendo realizados
describe('HeaderComponent', () => {

  //pode ser usado o 'test' ou o 'it'
it('renders correctly', () => {
 const { getByText } = render(
  <Header />
 )

//  debug()//gera um console.log com o HTML gerado

//o teste espera por um elemento chamado Home na tela e que ele esteja presente na renderização
expect(getByText("Home")).toBeInTheDocument()
expect(getByText("Posts")).toBeInTheDocument()
})

});