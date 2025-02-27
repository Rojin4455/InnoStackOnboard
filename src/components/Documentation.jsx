import React from 'react'

function Documentation() {
  return (
    <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 className="text-blue-800 font-medium mb-2">How to use this authentication flow:</h3>
    <ol className="list-decimal pl-5 text-sm text-blue-800">
      <li className="mb-1">Click "Authenticate with GoHighLevel" to get an authorization code</li>
      <li className="mb-1">After redirection back, use "Generate Access Token" to exchange the code for an access token</li>
      <li className="mb-1">Save the access token securely to use in your API requests to GoHighLevel</li>
      <li>Use the refresh token to get a new access token when it expires</li>
    </ol>
  </div>
  )
}

export default Documentation