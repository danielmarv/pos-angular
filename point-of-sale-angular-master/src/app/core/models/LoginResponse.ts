export interface LoginResponse {
  userId: number | null;
  access_token: string | null;
  token_type: string | null;
  name: string | null;
  expires_at: string | null;
  role: string | null; // admin, manager, economist, user
}
