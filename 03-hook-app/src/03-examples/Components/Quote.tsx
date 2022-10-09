import { FC, memo } from 'react'

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: FC<QuoteProps> = ({
  quote,
  author
}) => {

  return (
    <blockquote className="blockquote text-end">

      <p className="mb-1">{quote}</p>

      <footer className="blockquote-footer">{author}</footer>

    </blockquote>
  )
}

export default memo(Quote)
