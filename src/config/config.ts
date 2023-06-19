
let apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

if (/\/$/.test(apiEndpoint)) {
  // Поправляем URL, если он заканчивается на слеш
  apiEndpoint = apiEndpoint.substring(0, apiEndpoint.length - 1);
}

const config = {
  env: {
    apiEndpoint,
  }
}

export default config;
