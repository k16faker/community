



import React from 'react'

const SimpleWr = ({title, date, writer, hour, tag}) => {


  const dateOrTime = date === new Date().toLocaleDateString() ? hour : date;


  return (
    <div className='flex border w-[800px] h-[40px] px-2 justify-between items-center'>
      <div className='flex'>
        <p className='px-1 bg-slate-700 text-white rounded-md'>{tag}</p>
        <h1 className='ml-4'>{title}</h1>
      </div>
      <div className='flex w-[200px] justify-between'>
        <p>{writer}</p>
        <p>{dateOrTime}</p>
      </div>
    </div>
  )
}

export default SimpleWr