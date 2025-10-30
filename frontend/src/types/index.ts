export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  data?: {
    id: number;
    name: string;
    email: string;
  };
}


export interface Member {
  id: number;
  no_member: string;
  name: string;
  birth_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Book {
  id: number;
  title: string;
  publisher: string;
  dimensions: string;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface Loan {
  id: number;
  member_id: number;
  book_id: number;
  loan_date: string;
  return_date: string | null;
  is_returned: boolean;
  member?: Member;
  book?: Book;
  created_at?: string;
  updated_at?: string;
}

export interface WeeklyLoanData {
  week: string;
  count: number;
}
