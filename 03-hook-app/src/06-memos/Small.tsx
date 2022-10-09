import { FC, memo } from 'react'

interface SmallProps {
  value: number
}

const Small: FC<SmallProps> = ({ value }) => {

  console.log('Small component rendered')

  return (
    <small>{value}</small>
  )

}

export default memo(Small)
