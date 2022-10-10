import { Hijo } from './Hijo.js'
import { useCallback, useState } from 'react'

const numeros = [2, 4, 6, 8, 10]

export const Padre = () => {

  const [valor, setValor] = useState(0)

  const incrementar = useCallback((num: number) => {
    setValor(prevState => prevState + num)
  }, [])

  return (
    <div>
      <h1>Padre</h1>
      <p> Total: {valor} </p>

      <hr/>

      {
        numeros.map(n => (
          <Hijo
            key={n}
            numero={n}
            incrementar={incrementar}
          />
        ))
      }

    </div>
  )

}
