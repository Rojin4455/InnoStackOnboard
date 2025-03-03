import React from 'react'

function StatusIndicator({authCode, token}) {
  return (
    <div className="mb-8">
    <div className="flex items-center">
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${authCode ? 'bg-green-500' : 'bg-gray-200'}`}>
        <span className="text-white font-bold">1</span>
      </div>
      <div className={`flex-1 h-1 mx-2 ${token ? 'bg-green-500' : 'bg-gray-200'}`}></div>
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${token ? 'bg-green-500' : 'bg-gray-200'}`}>
        <span className="text-white font-bold">2</span>
      </div>
    </div>
    <div className="flex justify-between mt-2">
      <span className="text-sm text-gray-600">Get Authorization Code</span>
      <span className="text-sm text-gray-600">Generate Access Token</span>
    </div>
  </div>  
)
}

export default StatusIndicator