import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.log(error)

  if (isRouteErrorResponse(error)) {

    return (
      <div id="error-page">
        <h1>Oops! {error.status}</h1>
        <p>Sorry, an unexpected error has occurred</p>
        <p>
          <i>{error.statusText || error.data.message}</i>
        </p>
      </div>
    )

  } else {

    return <div>Opps!</div>

  }


}
