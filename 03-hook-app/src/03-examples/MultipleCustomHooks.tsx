import useFetch from '../hooks/useFetch'
import useFetchInternet from '../hooks/useFetchInternet'

interface ResponseApi {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

const MultipleCustomHooks = () => {

  const {
    data,
    error,
    isLoading
  } = useFetch<ResponseApi[]>({ url: 'https://www.breakingbadapi.com/api/quotes/1' })

  /* const {
    data,
    error,
    isLoading
  } = useFetchInternet<ResponseApi[]>({ url: 'https://www.breakingbadapi.com/api/quotes/1' }) */

  const { quote } = (!!data && data[0]) as ResponseApi

  return (
    <>
      <h1>Breaking Quotes</h1>

      {

        (isLoading) ? (
          <div className="alert alert-info text-center">
            Loading...
          </div>
        ) : (
          <blockquote className="blockquote text-end">

            <p className="mb-1">{quote}</p>

            <footer className="blockquote-footer">Arian Angoma</footer>

          </blockquote>
        )

      }

      <button className="btn btn-primary">
        Next quote
      </button>

    </>
  )

}

export default MultipleCustomHooks
