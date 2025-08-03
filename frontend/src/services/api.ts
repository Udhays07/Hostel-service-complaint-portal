// Make sure the API_URL points to your backend correctly
const API_URL = "http://localhost:8000/api";  // Change from localhost to 127.0.0.1

// Add better error handling to all API calls
export async function login(email: string, password: string) {
  try {
    console.log("Attempting login to:", `${API_URL}/users/login`);
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }
    
    return data;
  } catch (error) {
    console.error("Login fetch error:", error);
    throw error;
  }
}

export async function register(userData: {
  name: string;
  email: string;
  roll_number: string;
  password: string;
  hostel_name?: string;
  room_number?: string;
}) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Registration failed");
  }

  return response.json();
}

export async function getProfile(token: string) {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to get profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
}

export async function getComplaints(token: string) {
  try {
    console.log("Fetching complaints with token:", token.substring(0, 10) + "...");
    const response = await fetch(`${API_URL}/complaints`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Complaints response error:", response.status, errorText);
      throw new Error(`Failed to get complaints: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
}

export async function submitComplaint(token: string, complaintData: {
  category: string;
  title: string;
  description: string;
}) {
  const response = await fetch(`${API_URL}/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(complaintData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to submit complaint");
  }

  return response.json();
}

export async function updateComplaintStatus(token: string, complaintId: number, status: string) {
  const response = await fetch(`${API_URL}/complaints/${complaintId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update complaint status");
  }

  return response.json();
}