const backendURL = "192.168.32.7";

export async function loginData(email, password) {
  const result = await fetch(`http://${backendURL}:3000/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await result.json();

  if (result.ok) {
    return data.token;
  } else {
    throw new Error(data.error);
  }
}
