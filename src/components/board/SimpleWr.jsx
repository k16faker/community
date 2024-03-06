



import React from 'react'

const SimpleWr = ({title, date, writer, hour}) => {


  const dateOrTime = date === new Date().toLocaleDateString() ? hour : date;


  return (
    <div className='flex border w-[1000px] h-[30px] px-2 justify-between items-center'>
      <h1>{title}</h1>
      <div className='flex w-[200px] justify-between'>
        <p>{writer}</p>
        <p>{dateOrTime}</p>
      </div>
    </div>
  )
}

export default SimpleWr