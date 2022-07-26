import { render, screen } from '@testing-library/react'
import Post, { getStaticProps} from '../../pages/posts/preview/[slug]'
import { stripe } from '../../services/stripe'
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const post = {
  slug: 'my-new-post',
  title: 'my new post',
  content: 'post excerpt',
  updatedAt: 'dia'
}

jest.mock('next-auth/react')
jest.mock('../../services/prismic')
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

describe('Post Preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({data: null, status: "loading"})


    render(<Post post={post}/>)
    //é uma expressão regular
    expect(screen.getByText("my new post")).toBeInTheDocument()
    expect(screen.getByText("post excerpt")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it('redirects user to full post when user is logged in', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
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

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<Post post={post}/>)
    // screen.logTestingPlaygroundURL()//função para abrir uma URL que ajuda a mostrar quais elementos daquela tela podem ser testados

    expect(pushMocked).toHaveBeenCalledWith('/posts/my-new-post')

  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        uid: 'my-new-post',
        data: {
          title: [
            {type: 'heading', text: 'My new post'}
          ],
          content: [
            {type: 'paragraph', text: 'Post content'}
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getStaticProps({
      params: {slug: 'my-new-post'}
    })

    //eu espero que a minha resposta seja um objeto contendo no minimo o priceId e o amount
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      }))

  })
})