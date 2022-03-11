import { useState, useEffect } from 'react'

export function useHoneyPot(): [number, number, number, () => void] {
  const [numbers, setNumbers] = useState<number[]>([])

  const refresh = (): void => {
    setNumbers([
      Math.floor(Math.random() * 10 + 1),
      Math.floor(Math.random() * 10 + 1),
    ])
  }
  useEffect(() => {
    refresh()
  }, [])

  return [numbers[0], numbers[1], numbers[0] + numbers[1], refresh]
}
