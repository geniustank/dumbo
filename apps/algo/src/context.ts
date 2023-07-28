import type { ExpressContext } from "apollo-server-express";
import type { Request, Response } from "express";

export interface Context extends ExpressContext {
  req: Request;
  res: Response;
}
