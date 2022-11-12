import { FC } from 'react'
import { HeroList } from '../components'

const DcPage: FC = () => {
  return (
    <>
      <h1>DC Comics</h1>
      <hr/>

      <HeroList publisher={'DC Comics'}/>
    </>
  )
}

export default DcPage
