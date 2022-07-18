import {render} from '@testing-library/react'
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

test('active link renders correctly', () => {
 const {debug} = render(
  <ActiveLink href="/" activeClassName='active'>
    <a>Home</a>
  </ActiveLink>
 )

 debug()
});