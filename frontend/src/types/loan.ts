export interface Loan {
  id: number;
  member_id: number;
  book_id: number;
  borrow_date: string;
  return_date?: string;
  created_at: string;
  updated_at: string;
  member?: { name: string };
  book?: { title: string };
}
