import Cookies from "js-cookie";

export const API = "https://fakestoreapi.com";

export async function loginUser(username: string, password: string) {
  try {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Error logging in");
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Unknown error logging in");
    } else {
      throw new Error("Unknown error logging in");
    }
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${API}/products`);
    if (!res.ok) throw new Error("Error fetching products");
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Unknown error fetching products");
    } else {
      throw new Error("Unknown error fetching products");
    }
  }
}

export async function fetchProduct(id: string) {
  try {
    const res = await fetch(`${API}/products/${id}`);
    if (!res.ok) throw new Error("Error fetching product");
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Unknown error fetching product");
    } else {
      throw new Error("Unknown error fetching product");
    }
  }
}
