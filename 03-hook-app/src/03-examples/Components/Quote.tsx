import { FC, memo, useLayoutEffect, useRef, useState } from 'react'

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: FC<QuoteProps> = ({
  quote,
  author
}) => {

  const paragraphRef = useRef<HTMLParagraphElement>(null)

  const [boxSize, setBoxSize] = useState<DOMRect>()

  useLayoutEffect(() => {

    // console.log(paragraphRef.current?.getBoundingClientRect())

    setBoxSize(paragraphRef.current?.getBoundingClientRect())

  }, [])

  return (
    <>
      <blockquote
        className="blockquote text-end"
        style={{
          display: 'flex',
        }}
      >

        <p
          className="mb-1"
          ref={paragraphRef}
        >
          {quote}
        </p>

        <footer className="blockquote-footer">{author}</footer>

      </blockquote>

      <code>
        {JSON.stringify(boxSize, null, 2)}
      </code>
    </>
  )
}

export default memo(Quote)
