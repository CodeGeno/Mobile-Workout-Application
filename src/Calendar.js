import React, { useState, useEffect } from 'react'
import { months } from './data'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

function Calendar() {
  //dates
  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth())
  const [day, setDay] = useState(date.getDate())
  // Amount of days to render from previous month
  const prevMonthDays = new Date(year, month).getDay()

  // Total days previous month
  const lastMonthDays = new Date(year, month, 0).getDate()

  // Days loops results
  //
  //
  var prevDays = []
  var monthDays = []
  var nextDays = []

  //Days loops
  //
  //
  const displayedDays = () => {
    for (var i = 1; i <= prevMonthDays; i++) {
      prevDays[i] = lastMonthDays - prevMonthDays + i
    }
    for (var i = 0; i < new Date(year, month + 1, 0).getDate(); i++) {
      monthDays[i] = i + 1
    }
    for (var i = 1; i <= 42 - prevMonthDays - monthDays.length; i++) {
      nextDays[i] = i
    }
  }
  displayedDays()

  const clickDate = (jour, month) => {
    setDay(jour)
    setMonth(month)
  }
  const nextMonth = () => {
    if (month === 11) {
      setDay(null)
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
      setDay(null)
    }
  }
  const prevMonth = () => {
    if (month === 0) {
      setDay(null)
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
      setDay(null)
    }
  }
  return (
    <div className='Calendar-container'>
      <div className='date-container'>
        <button
          type='button'
          className='month-btn'
          onClick={() => {
            prevMonth()
          }}
        >
          <GrFormPrevious />
        </button>

        <div className='month-container'>
          <div>{months[month]}</div>
          <div>
            {day} {months[month]} {year}
          </div>
        </div>
        <button
          type='button'
          className='month-btn'
          onClick={() => {
            nextMonth()
          }}
        >
          <GrFormNext />
        </button>
      </div>
      <div className='day-container'>
        <ul className='day-list'>
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
      </div>
      <ul className='day-list'>
        {prevDays.map((jour) => {
          return (
            <li
              className='diff-month'
              key={jour}
              onClick={() => {
                clickDate(jour, month - 1)
              }}
            >
              {jour}
            </li>
          )
        })}
        {monthDays.map((jour) => {
          return (
            <li
              key={jour}
              onClick={() => {
                clickDate(jour, month)
              }}
            >
              {jour}
            </li>
          )
        })}
        {nextDays.map((jour) => {
          return (
            <li
              className='diff-month'
              key={jour}
              onClick={() => {
                clickDate(jour, month + 1)
              }}
            >
              {jour}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Calendar
