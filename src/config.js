// There is a bug with Codesandbox which prevents
// the request from passing the CORS preflight check.
// So we setup a proxy to bypass the CORS block.
const proxy = "https://loggi-bypass-cors.herokuapp.com/";
// const proxy = "https://r64eqibmkk.execute-api.us-east-1.amazonaws.com/dev/?url=";
// const proxy = "http://corsproxy-env.mrwver8hr4.us-east-1.elasticbeanstalk.com/";
const graphqlUrl = "https://staging.loggi.com/graphql";

export const endpoint = `${proxy}${graphqlUrl}`;
