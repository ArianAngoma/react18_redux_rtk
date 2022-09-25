interface GifItemProps {
  title: string
  url: string
  id: string
}

const GifItem = ({
  title,
  url,
}: GifItemProps) => {

  return (
    <div >

      <img
        src={url}
        alt={title}
      />
      <p>{title}</p>

    </div>
  )
}

export default GifItem
