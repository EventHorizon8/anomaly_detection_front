
const localStorageIsAvailable = typeof localStorage !== 'undefined';

const StoreAccessToken = {
  save: (accessToken: string) => {
    if (localStorageIsAvailable) {
      localStorage.setItem('access_token', accessToken);
    }
  },
  clean: () => {
    if (localStorageIsAvailable) {
      localStorage.setItem('access_token', '');
    }
  },
  get: (): string|null => {
    if (localStorageIsAvailable) {
      return localStorage.getItem('access_token') || null;
    }
    return null;
  }
};

export default StoreAccessToken;
