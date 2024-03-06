import { QueryStatus, useQuery } from '@tanstack/react-query'
import { Animal } from './APIResponsesTypes'
import fetchBreedList from './fetchBreedList'

export default function useBreedList(animal: Animal) {
  const results = useQuery(['breeds', animal], fetchBreedList)

  // `left ?? right` if we dont have a result for left then give us right
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ]
}