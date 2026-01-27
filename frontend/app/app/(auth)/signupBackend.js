const backendURL = "192.168.32.7";

export async function signupBackend(name, email, password) {
  const result = await fetch(`http://${backendURL}:3000/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!result.ok) {
    const data = await result.json();
    throw new Error(data.error);
  }

  return true;
}
