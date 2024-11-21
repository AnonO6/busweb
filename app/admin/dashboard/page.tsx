'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../../context/AppContext'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { routes, setRoutes } = useAppContext()
  const [newRoute, setNewRoute] = useState({ from: '', to: '', time: '' })

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault()
    const id = (routes.length + 1).toString()
    setRoutes([...routes, { id, ...newRoute }])
    setNewRoute({ from: '', to: '', time: '' })
  }

  const handleLogout = () => {
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">LNMIIT Bus Booking Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Route</h2>
          <form onSubmit={handleAddRoute} className="space-y-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="text"
                id="from"
                value={newRoute.from}
                onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="text"
                id="to"
                value={newRoute.to}
                onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                value={newRoute.time}
                onChange={(e) => setNewRoute({ ...newRoute, time: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Route
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Routes</h2>
          <ul className="space-y-2">
            {routes.map(route => (
              <li key={route.id} className="bg-gray-100 p-3 rounded">
                {route.from} to {route.to} at {route.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

