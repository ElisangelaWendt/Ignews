import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async/>)

  expect(screen.getByText('Hello World')).toBeInTheDocument()

  // expect(await screen.findByText('Button')).toBeInTheDocument() // uma das maneiras

  await waitFor(() => { //outra maneira
    return expect(screen.getByText('Button')).toBeInTheDocument()
  })
  // screen.logTestingPlaygroundURL()//função para abrir uma URL que ajuda a mostrar quais elementos daquela tela podem ser testados

  // await waitFor(() => { 
  //   return expect(screen.getByText('Button')).not.toBeInTheDocument() //para verificar se o botão NÃO está na tela
  // })

  // await waitForElementToBeRemoved(screen.queryByText('Button')) //para verificar se o botão NÃO está mais na tela
})