import { useQuery } from '@tanstack/react-query'
import fetchBreedList from './fetchBreedList'

export default function useBreedList(animal) {
  const results = useQuery(['breeds', animal], fetchBreedList)

  // `left ?? right` if we dont have a result for left then give us right
  return [results?.data?.breeds ?? [], results.status]
}