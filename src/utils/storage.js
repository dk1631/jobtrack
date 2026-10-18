const USER_KEY = "jobtrackUser";

export function saveUser(user) {
  localStorage.setItem(USER_KEY,JSON.stringify(user));

  window.dispatchEvent(new Event("userUpdated"));
}

export function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);

  window.dispatchEvent(new Event("userUpdated"));
}