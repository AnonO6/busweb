'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Route = {
  id: string
  from: string
  to: string
  time: string
}

type Seat = {
  id: number
  isReserved: boolean
}

type AppContextType = {
  routes: Route[]
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>
  seats: { [routeId: string]: Seat[] }
  reserveSeat: (routeId: string, seatId: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([
    { id: '1', from: 'Ajmeri Gate', to: 'LNMIIT', time: '08:00' },
    { id: '2', from: 'Ajmeri Gate', to: 'LNMIIT', time: '10:00' },
    { id: '3', from: 'Ajmeri Gate', to: 'LNMIIT', time: '13:00' },
    { id: '4', from: 'LNMIIT', to: 'Ajmeri Gate', time: '18:00' },
    { id: '5', from: 'LNMIIT', to: 'Ajmeri Gate', time: '21:00' },
    { id: '6', from: 'LNMIIT', to: 'Ajmeri Gate', time: '02:00' },
  ])

  const [seats, setSeats] = useState<{ [routeId: string]: Seat[] }>({})

  useEffect(() => {
    const initialSeats: { [routeId: string]: Seat[] } = {}
    routes.forEach(route => {
      initialSeats[route.id] = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, isReserved: false }))
    })
    setSeats(initialSeats)
  }, [routes])

  const reserveSeat = (routeId: string, seatId: number) => {
    setSeats(prevSeats => ({
      ...prevSeats,
      [routeId]: prevSeats[routeId].map(seat =>
        seat.id === seatId ? { ...seat, isReserved: true } : seat
      )
    }))
  }

  return (
    <AppContext.Provider value={{ routes, setRoutes, seats, reserveSeat }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

