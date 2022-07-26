import { render, screen} from '@testing-library/react'
import Home, { getStaticProps} from '../../pages'
import {stripe} from '../../services/stripe'
import { mocked } from 'jest-mock';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))
jest.mock('next-auth/react', () => {
  return{
    useSession: () => [null, false]
  }
})

jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {


    render(<Home product={{priceId: 'fake-price-id', amount:'R$10,00'}}/>)
                            //é uma expressão regular
    expect(screen.getByText("for R$10,00")).toBeInTheDocument()
  })

  it('loads iniitial data', async() => {
    const stripeMocked = mocked(stripe.prices.retrieve)

    //sempre que uma função for uma promisse (tem await), deve ser usado o mockResolvedValueOnce
    stripeMocked.mockResolvedValueOnce({ 
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    //eu espero que a minha resposta seja um objeto contendo no minimo o priceId e o amount
    expect(response).toEqual(
      expect.objectContaining({
      props:{
        product:{
          priceID: 'fake-price-id',
          amount: "$10.00",
        }
      }
    }))
  })
})