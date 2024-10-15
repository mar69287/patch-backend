import dotenv from 'dotenv';
import fetch from 'node-fetch'; 
import pkg from 'google-auth-library';
const { GoogleAuth } = pkg;

dotenv.config();

async function authenticateWithGoogle() {
  const auth = new GoogleAuth({
    credentials: {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL
    },
    scopes: ['https://www.googleapis.com/auth/cloud-platform'] 
  });

  const authClient = await auth.getClient();
  const token = await authClient.getAccessToken();
  return token.token; 
}

export async function queryGemini(urlToAnalyze, title) {
    try {
      const token = await authenticateWithGoogle();
      
      const response = await fetch('https://us-central1-doxci-ai.cloudfunctions.net/doxci-gemini', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'api-key': process.env.GEMINI_API_KEY, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: `Analyze the webpage at this URL: ${urlToAnalyze} related to the patch "${title}" and summarize the patch or update in one sentence. Then extract the detailed patch notes, updates, or changelogs, and present them in a structured format with bullet points under headings such as "Bug Fixes", "Balance Adjustments", or "New Features". Exclude any information about release dates or titles. Summarize only the relevant patch details for that patch title`,
            model: 'gemini-1.5-pro-002', 
        })
      });
  
      const contentType = response.headers.get("content-type");
      
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      console.log("Response from Gemini API:", data);
      return data; 
    } catch (error) {
      console.error('Error querying Gemini:', error);
      return null;
    }
}
