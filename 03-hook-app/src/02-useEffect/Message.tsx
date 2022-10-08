import { useEffect, useState } from 'react'

interface CoordsState {
  x: number
  y: number
}

const Message = () => {

  const [coords, setCoords] = useState<CoordsState>({
    x: 0,
    y: 0
  })

  useEffect(() => {

    const handleMouseMove = ({
      x,
      y
    }: MouseEvent) => {

      setCoords({
        x,
        y
      })

    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)

  }, [])

  return (
    <div>
      <h3>Usuario ya existe</h3>

      {

        JSON.stringify(coords, null, 2)

      }

    </div>
  )

}

export default Message
