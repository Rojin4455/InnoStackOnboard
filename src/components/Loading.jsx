import React from 'react'

function Loading({loading}) {
  return (
    <>
    {loading &&   <div className="fixed inset-0 flex items-center justify-center my-4">
    <div className="flex space-x-2 animate-pulse">
      <div className="w-3 h-3 bg-indigo-600"></div>
      <div className="w-3 h-3 bg-indigo-600"></div>
      <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
    </div>
    <p className="text-indigo-600 text-lg ml-2">Loading...</p>
  </div>}
    </>
  )
}

export default Loading