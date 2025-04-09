export default function getAPIURL() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL;
}
