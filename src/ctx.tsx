import { createContext, useContext } from 'react'
export type Role = 'Student' | 'Admin' | 'Mentor' | 'Finance' | 'PMO' | 'Management' | 'Marketing'
export const Ctx = createContext<{ role: Role; toast: (m: string) => void; confirm: (m: string, fn: () => void) => void; go: (p: string) => void }>({
  role: 'Admin', toast: () => {}, confirm: () => {}, go: () => {},
})
export const useApp = () => useContext(Ctx)
