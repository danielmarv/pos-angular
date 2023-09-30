export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  userId: number;
  photo: string | null;

  user_shift: {
    id: number;
    user_id: number;
    shift_id: number;
    shift: {
      id: number;
      name: string;
    };
  } | null;
}
