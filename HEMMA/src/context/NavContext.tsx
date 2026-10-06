import { createContext, useContext, type ReactNode } from 'react'

interface NavContextValue {
  /** Where the header's Home icon (and menu's Home item) should go for this section. */
  homeTo: string
}

const NavContext = createContext<NavContextValue>({ homeTo: '/' })

export function NavProvider({ homeTo, children }: { homeTo: string; children: ReactNode }) {
  return <NavContext.Provider value={{ homeTo }}>{children}</NavContext.Provider>
}

export function useNav() {
  return useContext(NavContext)
}
