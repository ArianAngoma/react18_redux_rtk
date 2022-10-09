import useFetch from '../hooks/useFetch'
import useFetchInternet from '../hooks/useFetchInternet'

export interface ResponseApi {
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

  console.log({
    data,
    error,
    isLoading
  })

  return (
    <>
      <h1>Breaking Quotes</h1>
    </>
  )

}

export default MultipleCustomHooks
