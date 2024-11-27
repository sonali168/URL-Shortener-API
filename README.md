render deploy link:https://url-shortener-api-ado4.onrender.com

Reinstall Dependencies: npm install
Start your application in development mode : npm run dev

Test the Root Endpoint (/)
Open a browser and visit: https://url-shortener-api-ado4.onrender.com/
If implemented, it should return a welcome message like: Welcome to the URL Shortener API!

2. Test the POST /shorten Endpoint
This endpoint is used to shorten a URL. Use a tool like Postman to send a POST request.
Open Postman.
Set the method to POST and enter the URL: https://url-shortener-api-ado4.onrender.com/shorten
Go to the Body tab, select raw, and set the type to JSON. Provide the input: json
{
  "url": "https://example.com"
}
Click Send.
If working, you should receive a response with a shortened URL:
{
  "shortUrl": "https://url-shortener-api-ado4.onrender.com/abcd1234"
}

3. Test the Endpoints
1. Copy the shortId returned from the POST /shorten response, e.g., abcd1234.
Open a browser and visit: https://url-shortener-api-ado4.onrender.com/abcd1234
If working, it should redirect you to https://example.com.

2.Set the method to GET and enter the URL: https://url-shortener-api-ado4.onrender.com/stats/abcd1234
Click Send.
If working, you should receive a response like:
{
    "originalUrl": "https://example.com",
    "clicks": 2,
    "lastAccessed": "2024-11-27T06:09:27.118Z"
}
