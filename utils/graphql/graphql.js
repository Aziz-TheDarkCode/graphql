import aziz from "./query.js";

// Function to get the JWT token from localStorage
function getAuthToken() {
  return localStorage.getItem("token");
}
// Function to make a GraphQL request with the JWT token
async function makeGraphQLRequest(query) {
  const InvalidTokenMessages = [
    "Could not verify JWT:",
    "Malformed Authorization header",
  ];

  const token = getAuthToken();

  try {
    const response = await fetch(
      "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token} `, // Include the JWT token here
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );
    const data = await response.json();
    if (data.errors) {
      for (let index = 0; index < InvalidTokenMessages.length; index++) {
        const element = InvalidTokenMessages[index];
        if (data.errors[0].message.includes(element)) {
          localStorage.clear("token");
          window.location.href = "index.html";
        }
      }
    } else {
      return data.data.user;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
const datas = await makeGraphQLRequest(aziz());
export default datas;
