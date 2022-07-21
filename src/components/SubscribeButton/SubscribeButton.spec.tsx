import {render, screen, fireEvent} from '@testing-library/react'

import { SubscribeButton } from '.';
import { signIn, useSession} from 'next-auth/react'
import { mocked } from 'jest-mock';
import {useRouter} from 'next/router'

jest.mock('next-auth/react')

jest.mock('next/router')

describe('SubscribeButton', () => {
it('renders correctly', () => {
  const useSessionMocked = jest.mocked(useSession)

  useSessionMocked.mockReturnValueOnce({data: null, status: "loading"})

  render(
  <SubscribeButton />
 )

expect(screen.getByText("Subscribe Now")).toBeInTheDocument()
})

it('redirects user to signin when not authenticated', () => {
  const useSessionMocked = jest.mocked(useSession)

  useSessionMocked.mockReturnValueOnce({data: null, status: "loading"})

  const signInMocked = mocked(signIn)
  render(<SubscribeButton/>)

  const subscribeButton = screen.getByText('Subscribe Now')

  fireEvent.click(subscribeButton)

  expect(signInMocked).toHaveBeenCalled()
})
it('redirects to posts when user already has a subscription', () => {
  const useRouterMocked = mocked(useRouter)
  const useSessionMocked = mocked(useSession)
  const pushMocked = jest.fn()

  useSessionMocked.mockReturnValueOnce(
    {
      data: {
        user: { name: "John", 
        email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake-act',
      },
      status: "authenticated",
    }
  );
  //quando essa função for chamado, o retorno dela deve ser 
  useRouterMocked.mockReturnValueOnce({
    push: jest.fn()
  } as any)

  render(<SubscribeButton/>)

  const subscribeButton = screen.getByText('Subscribe Now')

  fireEvent.click(subscribeButton)

  expect(pushMocked).toHaveBeenCalled()

})
});