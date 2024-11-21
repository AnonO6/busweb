'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Seat = {
  id: number
  isReserved: boolean
}

export default function BookingPage() {
  const router = useRouter()
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: 40 }, (_, i) => ({ id: i + 1, isReserved: false }))
  )
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])

  const handleSeatClick = (seatId: number) => {
    if (seats.find(seat => seat.id === seatId)?.isReserved) return

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    )
  }

  const handleReservation = () => {
    setSeats(prev =>
      prev.map(seat =>
        selectedSeats.includes(seat.id) ? { ...seat, isReserved: true } : seat
      )
    )
    setSelectedSeats([])
    alert('Seats reserved successfully!')
  }

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">LNMIIT Bus Booking</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {seats.map(seat => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat.id)}
              className={`p-4 rounded-md ${
                seat.isReserved
                  ? 'bg-gray-400 cursor-not-allowed'
                  : selectedSeats.includes(seat.id)
                  ? 'bg-orange-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={seat.isReserved}
            >
              Seat {seat.id}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            Selected Seats: {selectedSeats.join(', ')}
          </p>
          <button
            onClick={handleReservation}
            disabled={selectedSeats.length === 0}
            className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Reserve Seats
          </button>
        </div>
      </div>
    </div>
  )
}

