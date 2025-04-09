export default function getAPIURL() {
  process.env.NODE_ENV === "development" ? "https://localhost:3000" : "";
}
