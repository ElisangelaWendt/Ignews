import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts/'
import { stripe } from '../../services/stripe'
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';

const posts = [{
  slug: 'my-new-post',
  title: 'my new post',
  excerpt: 'post excerpt',
  updatedAt: 'dia'
}]

jest.mock('../../services/prismic')

describe('Home page', () => {
  it('renders correctly', () => {


    render(<Posts posts={posts} />)
    //é uma expressão regular
    expect(screen.getByText("my new post")).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    //sempre que uma função for uma promisse (tem await), deve ser usado o mockResolvedValueOnce
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                {type: 'heading', text: 'My new post'}
              ],
              content: [
                {type: 'paragraph', text: 'Post excerpt'}
              ],
            },
            last_publication_date:'04-01-2021'
          }
        ]
      })
       } as any);

    const response = await getStaticProps({})

    //eu espero que a minha resposta seja um objeto contendo no minimo o priceId e o amount
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }]
        }
      }))
  })
})