enum user {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface ContextKey {
  user: user;
  key: string;  
  timestamp: string;
}
