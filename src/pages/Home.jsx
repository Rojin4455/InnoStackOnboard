import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Documentation from '../components/Documentation';
import GenerateTokens from '../components/GenerateTokens';
import GenerateAuthCode from '../components/GenerateAuthCode';
import StatusIndicator from '../components/StatusIndicator';
import { toast } from 'sonner';

function OAuthFlowComponent() {
  const [authCode, setAuthCode] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true)

  const query = new URLSearchParams(useLocation().search);
  const code = query.get('code');

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REACT_APP_BASE_URL;
  
  const TOKEN_URL = "https://services.leadconnectorhq.com/oauth/token";
  const PREV = "https://marketplace.leadconnectorhq.com/oauth/chooselocation";
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

  useEffect(() => {
    if (code) {
      setAuthCode(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [code]);




const scopes = [
    "conversations.readonly",
    "conversations.write",
    "conversations/message.readonly",
    "conversations/message.write",
    "contacts.write",
    "contacts.readonly",
    "conversations/reports.readonly",
    "conversations/livechat.write",
]

  
  const SCOPE = scopes.join(" ");


  const redirectToExternal = () => {
    setIsLoading(true);
    const authUrl = `${PREV}?` +
      `response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(SCOPE)}`;
    
    window.location.href = authUrl;
  };

  const fetchToken = async () => {
    setIsTokenLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("grant_type", "authorization_code");
      formData.append("client_id", CLIENT_ID);
      formData.append("client_secret", CLIENT_SECRET);
      formData.append("redirect_uri", REDIRECT_URI);
      formData.append("code", authCode);

      const response = await axios.post(TOKEN_URL, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setToken(response.data);
      setIsTokenLoading(false);
    } catch (err) {
      console.error("Error fetching token:", err);
      setError(err.response?.data?.error_description || "Failed to fetch token");
      setIsTokenLoading(false);
    }
  };

  // Reset auth flow
  const resetFlow = () => {
    setAuthCode(null);
    setToken(null);
    setError(null);
    // setIsSubmit()
  };


  const submitCredentials = async () => {
    console.log("passing token data:", token)
    const expiresAtISO = new Date(Date.now() + (token.expires_in * 1000)).toISOString();
    try{
        const response = await axios.post(`${BASE_API_URL}/accounts/create-credentials/`,{
            access_token: token.access_token,
            company_id: token.companyId,
            expires_at: expiresAtISO, 
            location_id: token.locationId,
            refresh_token: token.refresh_token,
            scope: token.scope,
            token_type: token.token_type,
            user_id: token.userId,
            user_type: token.userType
        })

        if (response.status === 201) {
            console.log("created the credentials successfully")
            toast.success("created the credentials successfully")
            setIsSubmit(false)
        }else{
            console.log("something went wrong")
        }
    
    }catch(err){
        console.error("something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 py-6 px-6">
          <h1 className="text-2xl font-bold text-white">OAuth Authentication Flow</h1>
          <p className="text-indigo-100 mt-1">Connect with GoHighLevel API</p>
        </div>
        
        <div className="p-8">
          {/* Status Indicator */}
            <StatusIndicator authCode={authCode} token={token} />

          {/* Step 1: Auth Code */}
          <GenerateAuthCode authCode={authCode} isLoading={isLoading} redirectToExternal={redirectToExternal} /> 

          {/* Step 2: Access Token */}
          <GenerateTokens authCode={authCode} token={token} error={error} fetchToken={fetchToken} isTokenLoading={isTokenLoading} />

          {(authCode && token && isSubmit) && (
            <button 
              onClick={submitCredentials}
              className={`w-full flex justify-center py-4 px-4 mb-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium  ${isSubmit ? "text-white bg-indigo-600 hover:bg-indigo-700" : "text-gray-700 bg-white hover:bg-gray-50"} `}
            >
              Submit
            </button>
          )}
          {/* Reset Button */}
          {(authCode || token) && (
            <button 
              onClick={resetFlow}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Reset Authentication Flow
            </button>
          )}

          {/* Documentation Box */}
          <Documentation/>
        </div>
      </div>
    </div>
  );
}

export default OAuthFlowComponent;