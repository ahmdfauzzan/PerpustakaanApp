import type { AuthResponse, Book, Loan, Member } from "../types";

const API_URL = "http://localhost:8000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

 register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email, password }),
  });

  // Abaikan error kecil, tetap ambil JSON dulu
  const data = await response.json();

  // Jika status 200 atau 201, anggap sukses
  if (response.status === 200 || response.status === 201) {
    return data;
  } else {
    throw new Error(data.message || "Registration failed");
  }
},


  logout: async (): Promise<void> => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    localStorage.removeItem("token");
  },
};

export const memberAPI = {
  getAll: async (): Promise<Member[]> => {
    const response = await fetch(`${API_URL}/members`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch members');
    const data = await response.json();
    return data.data || data;
  },

  create: async (member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await fetch(`${API_URL}/members`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(member),
    });
    if (!response.ok) throw new Error('Failed to create member');
    const data = await response.json();
    return data.data || data;
  },

  update: async (id: number, member: Partial<Member>): Promise<Member> => {
    const response = await fetch(`${API_URL}/members/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(member),
    });
    if (!response.ok) throw new Error('Failed to update member');
    const data = await response.json();
    return data.data || data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/members/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete member');
  },
};

export const bookAPI = {
  getAll: async (): Promise<Book[]> => {
    const response = await fetch(`${API_URL}/books`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch books');
    const data = await response.json();
    return data.data || data;
  },

  create: async (book: Omit<Book, 'id'>): Promise<Book> => {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error('Failed to create book');
    const data = await response.json();
    return data.data || data;
  },

  update: async (id: number, book: Partial<Book>): Promise<Book> => {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error('Failed to update book');
    const data = await response.json();
    return data.data || data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete book');
  },
};

export const loanAPI = {
  getAll: async (): Promise<Loan[]> => {
    const response = await fetch(`${API_URL}/loans`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch loans');
    const data = await response.json();
    return data.data || data;
  },

  create: async (loan: { member_id: number; book_id: number; loan_date: string }): Promise<Loan> => {
    const response = await fetch(`${API_URL}/loans`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(loan),
    });
    if (!response.ok) throw new Error('Failed to create loan');
    const data = await response.json();
    return data.data || data;
  },

  returnBook: async (id: number, return_date: string): Promise<Loan> => {
    const response = await fetch(`${API_URL}/loans/${id}/return`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ return_date }),
    });
    if (!response.ok) throw new Error('Failed to return book');
    const data = await response.json();
    return data.data || data;
  },
};
