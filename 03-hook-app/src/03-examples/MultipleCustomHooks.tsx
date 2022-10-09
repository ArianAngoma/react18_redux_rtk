import { useFetch, useFetchInternet, useCounter } from '../hooks'
import { LoadingQuote, Quote } from './Components'

interface ResponseApi {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

const MultipleCustomHooks = () => {

  const {
    counter,
    handleIncrement
  } = useCounter({
    initialState: 1,
  })

  const {
    data,
    error,
    isLoading
  } = useFetch<ResponseApi[]>({ url: `https://www.breakingbadapi.com/api/quotes/${counter}` })

  /* const {
    data,
    error,
    isLoading
  } = useFetchInternet<ResponseApi[]>({ url: `https://www.breakingbadapi.com/api/quotes/${counter}` }) */

  const {
    quote,
    author
  } = (!!data && data[0]) as ResponseApi

  return (
    <>
      <h1>Breaking Quotes</h1>

      {

        isLoading && <LoadingQuote/>

      }

      {

        (!isLoading && !error) && <Quote
          quote={quote}
          author={author}
        />

      }

      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={() => handleIncrement()}
      >
        Next quote
      </button>

    </>
  )

}

export default MultipleCustomHooks
