import { useContext } from 'react'
import { streamContext } from '@/context/streamContext'

export default function useStream() {
  const value = useContext(streamContext)
  console.log(value)
  return value
}
