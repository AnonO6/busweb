'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Route = {
  id: string
  from: string
  to: string
  time: string
  isAvailable: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [routes, setRoutes] = useState<Route[]>([
    { id: '1', from: 'Ajmeri Gate', to: 'LNMIIT', time: '08:00', isAvailable: false },
    { id: '2', from: 'Ajmeri Gate', to: 'LNMIIT', time: '10:00', isAvailable: false },
    { id: '3', from: 'Ajmeri Gate', to: 'LNMIIT', time: '13:00', isAvailable: false },
    { id: '4', from: 'LNMIIT', to: 'Ajmeri Gate', time: '18:00', isAvailable: false },
    { id: '5', from: 'LNMIIT', to: 'Ajmeri Gate', time: '21:00', isAvailable: false },
    { id: '6', from: 'LNMIIT', to: 'Ajmeri Gate', time: '02:00', isAvailable: false },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const updatedRoutes = routes.map(route => {
      const [hours, minutes] = route.time.split(':').map(Number)
      const routeTime = new Date(currentTime)
      routeTime.setHours(hours, minutes, 0, 0)

      const timeDiff = routeTime.getTime() - currentTime.getTime()
      const isAvailable = timeDiff > 0 && timeDiff <= 2 * 60 * 60 * 1000 // Available if within 2 hours before departure

      return { ...route, isAvailable }
    })

    setRoutes(updatedRoutes)
  }, [currentTime])

  const handleRouteSelect = (route: Route) => {
    if (route.isAvailable) {
      router.push(`/booking?route=${route.id}`)
    }
  }

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <Image src="/lnmiit-logo.png" alt="LNMIIT Logo" width={200} height={100} />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Bus Route Selection</h1>
        <p className="text-lg mb-4">Current Time: {currentTime.toLocaleTimeString()}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map(route => (
            <button
              key={route.id}
              onClick={() => handleRouteSelect(route)}
              className={`p-4 rounded-md ${
                route.isAvailable
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!route.isAvailable}
            >
              <p className="font-semibold">{route.from} to {route.to}</p>
              <p>Departure: {route.time}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

