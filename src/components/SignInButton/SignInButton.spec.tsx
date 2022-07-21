import {render, screen} from '@testing-library/react'

import { SignInButton } from '.';
import {useSession} from 'next-auth/react'
import { mocked } from 'jest-mock';

jest.mock('next-auth/react')

//describe serve para descrever de qual componente os testes estão sendo realizados
describe('SignInButton', () => {

  //pode ser usado o 'test' ou o 'it'
it('renders correctly when user is not signed in', () => {
  const useSessionMocked = mocked(useSession)
//quando a função useSession for chamada, vai retornar nulo e falso
  useSessionMocked.mockReturnValueOnce({data: null, status: "loading"})

  render(
  <SignInButton />
 )

expect(screen.getByText("Sign In with GitHub")).toBeInTheDocument()
})

it('renders correctly when user is signed in', () => {
  const useSessionMocked = mocked(useSession)
  //quando a função useSession for chamada, vai retornar nulo e falso
  useSessionMocked.mockReturnValueOnce(
    {
      data: {
        user: { name: "John", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
    } as any
  );

  render(
  <SignInButton />
 )

expect(screen.getByText("John")).toBeInTheDocument()
})

});