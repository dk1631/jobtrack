import API_URL from "./api";

export async function addApplication(application) {
  const response = await fetch(`${API_URL}/applications`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(application),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to add application");
  }

  return response.json();
}

export async function getApplicationsByUser(userId) {
  const response = await fetch(`${API_URL}/applications?userId=${encodeURIComponent(userId)}`);

  if (!response.ok) {
    throw new Error(
      "Unable to load applications"
    );
  }

  return response.json();
}

export async function getApplicationById(id) {
  const response = await fetch(`${API_URL}/applications/${id}`);

  if (!response.ok) {
    throw new Error(
      "Unable to load application"
    );
  }

  return response.json();
}

export async function updateApplication(id,updatedApplication) {

  const response = await fetch(`${API_URL}/applications/${id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedApplication),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to update application"
    );
  }

  return response.json();
}

export async function deleteApplication(id) {
  const response = await fetch(`${API_URL}/applications/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to delete application"
    );
  }
}

export async function updateUser(id, data) {
  const response = await fetch(`${API_URL}/users/${id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to update user"
    );
  }

  return response.json();
}