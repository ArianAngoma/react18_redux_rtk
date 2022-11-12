import { FC, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HeroCard } from '../components'
import useForm from '../../hooks/useForm'

interface FormValues {
  searchText: string
}

const SearchPage: FC = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''

  const {
    searchText,
    onInputChange,
  } = useForm<FormValues>({
    searchText: ''
  })

  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    if (searchText.trim().length <= 1) return

    setSearchParams({ q: searchText })

  }

  return (
    <>

      <h1>Search</h1>
      <hr/>

      <div className="row">

        <div className="col-5">

          <h4>Searching</h4>
          <hr/>

          <form onSubmit={onSearchSubmit}>

            <input
              type="text"
              placeholder="Search your hero"
              className="form-control"
              name="searchText"
              value={searchText}
              onChange={onInputChange}
              autoComplete="off"
            />

            <button className="btn btn-outline-primary mt-1">
              Search...
            </button>

          </form>

        </div>

        <div className="col-7">

          <h4>Results</h4>
          <hr/>

          <div className="alert alert-primary">
            Search a hero
          </div>

          <div className="alert alert-danger">
            There is no a hero with <b>{query}</b>
          </div>

          {/* <HeroCard
            id={}
            superhero={}
            publisher={}
            alter_ego={}
            first_appearance={}
            characters={}
          /> */}

        </div>

      </div>

    </>
  )
}

export default SearchPage
