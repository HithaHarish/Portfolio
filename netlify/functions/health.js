export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString()
    }),
  };
};

// https://hithaharishportfolio.netlify.app/netlify/functions/health open this site to check if backend is working
// . is required for live access - netlify's format to access backend 

//this file is used to check if the backend is running
// Adding this ensures conact runs only if health runs 
//const res = await fetch(`${process.env.BASE_URL}/api/health`);
//const health = await res.json();
//if (health.status !== 'ok') {
 // return {
    //statusCode: 503,
    //body: JSON.stringify({ error: 'Service Unavailable' }),
 // };
//If health fails due to server issues, contact will also because backend is not alive
