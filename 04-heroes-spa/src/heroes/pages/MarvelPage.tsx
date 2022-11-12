import { FC } from 'react'
import { HeroList } from '../components'

const MarvelPage: FC = () => {
  return (
    <>
      <h1>Marvel Comics</h1>
      <hr/>

      <HeroList publisher={'Marvel Comics'}/>
    </>
  )
}

export default MarvelPage
