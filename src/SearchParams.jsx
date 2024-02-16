import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import AdoptedPetContext from './AdoptedPetContext'
import Results from './Results'
import useBreedList from './useBreedList'
import fetchSearch from './fetchSearch'
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
    page: 0,
  })

  const [animal, setAnimal] = useState('')
  const [breeds] = useBreedList(animal)
  const [pagination, setPagination] = useState(0)

  const [adoptedPet] = useContext(AdoptedPetContext)

  const results = useQuery(['search', requestParams], fetchSearch)
  const pets = results?.data?.pets ?? []

  const hasNext = results?.data?.hasNext

  const handlePagination = (increment) => {
    setRequestParams((prevParams) => ({
      ...prevParams,
      page: prevParams.page + increment,
    }))
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? '',
            page: 0,
          }

          setRequestParams(obj)
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            onChange={(e) => {
              setAnimal(e.target.value)
            }}
            id="animal"
            value={animal}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={breeds.length === 0} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <div className="pagination">
        <button className={requestParams.page === 0 && 'hide'} onClick={() => handlePagination(-1)}>
          Prev
        </button>
        <button className={!hasNext && 'hide'} onClick={() => handlePagination(1)}>
          Next
        </button>
      </div>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams
