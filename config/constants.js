export const isDev = process.env.NODE_ENV === "development";
export const CLIENT_URL = isDev
  ? "http://localhost:3000"
  : "https://black-book-1454c.web.app";
