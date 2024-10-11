import { useEffect } from 'react'

export const useMount = (fn) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: I know what I'm doing
  useEffect(() => fn(), [])
}
