import API_URL from "./api";

export async function getUserByEmail(email) {
  const response = await fetch(
    `${API_URL}/users?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Unable to check user");
  }

  return response.json();
}

export async function registerUser(user) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Unable to create account");
  }

  return response.json();
}

export async function loginUser(email) {
  const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Unable to login");
  }

  const users = await response.json();

  return users;
}