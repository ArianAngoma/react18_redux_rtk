interface FristAppProps {
  title: string
  subTitle?: string
  name?: string
}

export const FirstApp = ({
  title,
  subTitle = 'No hay subtítulo',
  name = 'Arian Angoma'
}: FristAppProps) => {

  // console.log(props);

  return (
    <>
      <h1 data-testid="test-title">{title}</h1>
      {/* <code>{ JSON.stringify( newMessage ) }</code> */}
      <p>{subTitle}</p>
      <p>{subTitle}</p>
      <p>{name}</p>
    </>
  )
}
