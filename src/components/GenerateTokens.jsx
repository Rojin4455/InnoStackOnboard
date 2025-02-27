import React from 'react'

function GenerateTokens({authCode, token, error, fetchToken, isTokenLoading}) {
    console.log("token: ", token)
  return (
    <div className="mb-6">
            <div className={`bg-gray-50 p-6 rounded-lg border ${!authCode ? 'border-gray-200 opacity-50' : 'border-gray-200'}`}>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Step 2: Generate Access Token</h2>
              
              {token ? (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-green-700 font-medium">Access Token Generated</span>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded mb-4">
                  <div className="mb-2">
  <span className="font-medium mr-2">Access Token:</span>
  <code className="text-sm break-all">
    {token.access_token
      ? `${token.access_token.substring(0, 25)}...${token.access_token.substring(token.access_token.length - 10)}`
      : "Access token available"}
  </code>
</div>

                    <div className="mb-2">
                      <span className="font-medium mr-2">Token Type:</span>
                      <code className="text-sm">{token.token_type}</code>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium mr-2">Expires In:</span>
                      <code className="text-sm">{token.expires_in} seconds</code>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium mr-2">Location Id:</span>
                      <code className="text-sm">{token.locationId}</code>
                    </div>
                    {token.refresh_token && (
                      <div>
                        <span className="font-medium mr-2">Refresh Token:</span>
                        <code className="text-sm break-all">
                            {token.refresh_token
                            ? `${token.refresh_token.substring(0,25)}...${token.refresh_token.substring(token.refresh_token.length-10)}`
                            : "Refresh Token is not available"
                        }
                            </code>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 mb-4">
                  {authCode 
                    ? "Use your authorization code to generate an access token for API requests." 
                    : "First, get an authorization code to proceed with this step."}
                </p>
              )}
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={fetchToken}
                disabled={!authCode || token || isTokenLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                  ${authCode && !token ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                {isTokenLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Token...
                  </>
                ) : token ? "Token Generated" : "Generate Access Token"}
              </button>
            </div>
          </div>
  )
}

export default GenerateTokens