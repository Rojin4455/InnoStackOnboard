import React, {useState} from 'react'
import { Clipboard, Check } from "lucide-react"; // Importing icons from Lucide React


function GenerateAuthCode({authCode, redirectToExternal, isLoading}) {

    const [copied, setCopied] = useState(false);
  
    const copyToClipboard = () => {

      navigator.clipboard.writeText(authCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };


  return (
    <div className="mb-8">
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Step 1: Get Authorization Code</h2>
      
      {authCode ? (
    <div className="mb-4">
    <div className="flex items-center mb-2">
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <span className="text-green-700 font-medium">Authorization Code Received</span>
    </div>
    
    <div className="bg-gray-100 p-3 rounded overflow-x-auto flex items-center justify-between">
      <code className="text-sm text-gray-800">{authCode}</code>
      <button onClick={copyToClipboard} className="ml-3 text-gray-500 hover:text-gray-700 transition">
        {copied ? (
          <Check className="w-5 h-5 text-green-600" /> // Check icon after copying
        ) : (
          <Clipboard className="w-5 h-5" /> // Clipboard icon for copying
        )}
      </button>
    </div>
  </div>
      ) : (
        <p className="text-gray-600 mb-4">
          Click the button below to authenticate with GoHighLevel and get an authorization code.
        </p>
      )}
      
      <button
        onClick={redirectToExternal}
        disabled={isLoading || authCode}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${!authCode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Redirecting...
          </>
        ) : authCode ? "Code Received" : "Authenticate with GoHighLevel"}
      </button>
    </div>
  </div>
  )
}

export default GenerateAuthCode