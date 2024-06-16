import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <>
    <section className='flex flex-col size-full gap-10 text-white'>
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>
      <CallList type="upcoming"/>
    </section>
    </>
  )
}

export default Upcoming