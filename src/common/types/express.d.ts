import { User } from 'src/database/entities';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
      requestId?: string;
    }
  }
}
