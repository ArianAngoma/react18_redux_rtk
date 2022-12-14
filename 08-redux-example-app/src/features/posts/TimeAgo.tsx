import { FC } from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

interface TimeAgoProps {
  timestamp: string
}

const TimeAgo: FC<TimeAgoProps> = ({ timestamp }) => {

  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)
  const timeAgo = `${timePeriod} ago`

  return (
    <span title={timestamp}>
        &nbsp; <i>{timeAgo}</i>
    </span>
  )

}

export default TimeAgo
