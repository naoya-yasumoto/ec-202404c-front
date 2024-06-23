export const getAccessToken = (): string | null => {
    console.log(window.sessionStorage.getItem('accessToken'))
    return window.sessionStorage.getItem('accessToken');
  };
  
  export const decodeToken = (token: string): { username: string; userid: number } | null => {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: tokenPayload.username,
        userid: tokenPayload.userid,
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };
  
  export const isLoggedIn = (): boolean => {
    const token = getAccessToken();
    return !!token && !!decodeToken(token);
  };