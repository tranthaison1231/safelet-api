interface Error {
  status?: number;
}

declare namespace Express {
  export interface Request {
    user: any;
  }
}
