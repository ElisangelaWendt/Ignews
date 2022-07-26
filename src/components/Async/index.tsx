import { useEffect, useState } from "react"

export function Async(){
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  //na hora que o componente for renderizado irá disparar a função de useEffect
  useEffect(() => {
    //para imitar o funcionamento de algo que poderia acontecer de forma assincrona, ou seja, que pode demorar um pouco para executar
    setTimeout(() => {
      setIsButtonVisible(true)
    },1000)
  })
  return(
    <div>
      <div>Hello World</div>
      {isButtonVisible && 
      <button>Button</button>
      }
    </div>
  )
}