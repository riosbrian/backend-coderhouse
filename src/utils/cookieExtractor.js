export const cookieExtractor = (cookie) => {
  return cookie.accessToken || null;
};
