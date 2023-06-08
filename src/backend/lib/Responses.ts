import { Response } from "express";

const StatusMap = {
  '404': {
    err: 'Resource not Found'
  },
  '500': {
    err: 'Internal server error'
  }
};

export function response(res: Response, status: keyof typeof StatusMap) {
  res.status(Number(status)).json(StatusMap[status]);
}