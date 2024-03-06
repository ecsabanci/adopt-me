import { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AdoptedPetContext from './AdoptedPetContext'
import fetchPet from './fetchPet'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import Modal from './Modal'
import { PetAPIResponse } from './APIResponsesTypes'

const Details = () => {
  const { id } = useParams()
  // ["details", id] will be passed as the queryKey to fetchPet

  if(!id) {
    throw new Error("why did you not give me an id. I wanted an id. I have no id.");
  }

  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const results = useQuery(['details', id], fetchPet)

  const [_, setAdoptedPet] = useContext(AdoptedPetContext)

  // isLoading is for the first loading
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    )
  }

  const pet = results?.data?.pets[0]
  if(!pet) {
    throw new Error("no pet lol");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1> {pet.name} </h1>
        <h2>
          {' '}
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet)
                      navigate('/')
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  )
}

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  )
}

export default DetailsErrorBoundary
