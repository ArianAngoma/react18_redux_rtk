import { useEffect } from 'react'

const Message = () => {

  useEffect(() => {

    console.log('component mounted')

    return () => console.log('component unmounted')

  }, [])

  return (
    <div>
      <h3>Usuario ya existe</h3>
    </div>
  )

}

export default Message
