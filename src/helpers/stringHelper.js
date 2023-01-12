export const generateRandomString = (length = 16) => {
  return Math.random().toString(length).substring(2, length);
}
