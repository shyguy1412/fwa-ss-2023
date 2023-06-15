// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Request, Response } from 'express';
import { User } from '../../modules/models/User';
import { User as IUser } from '../../../frontend/lib/api_client';
import { response } from '../../lib/Responses';


const methods = {
  GET: (req: Request, res: Response) => _get(req, res),
  HEAD: (req: Request, res: Response) => _head(req, res),
  POST: (req: Request, res: Response) => _post(req, res),
  PUT: (req: Request, res: Response) => _put(req, res),
  DELETE: (req: Request, res: Response) => _delete(req, res),
  UPDATE: (req: Request, res: Response) => _update(req, res),
  OPTIONS: (req: Request, res: Response) => _options(req, res),
  TRACE: (req: Request, res: Response) => _trace(req, res),
};

export default async function handler(req: Request, res: Response) {
  const method = req.method ?? 'GET';
  if (Object.hasOwn(methods, method))
    await methods[method as keyof typeof methods](req, res);
}

async function _get(req: Request, res: Response) {
  const {id} = req.params;  
  const user = await User.findOne({
    where:{
      id:id
    }
  });
  if(!user) return response(res, "404");
  const userResponse:Required<IUser> = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      postcode: user.postcode,
      city: user.city,
      street: user.street,
      email: user.email,
      phone: user.phone
  };
  res.status(200).json({ user: userResponse });

}

async function _post(req: Request, res: Response) {
  res.status(500).send('Method does not exist for this route');
}

async function _put(req: Request, res: Response) {
  res.status(500).send('Method does not exist for this route');
}

async function _delete(req: Request, res: Response) {
  res.status(500).send('Method does not exist for this route');
}

async function _head(req: Request, res: Response<any>) {
  res.status(500).send('Method does not exist for this route');
}
async function _update(req: Request, res: Response<any>) {
  res.status(500).send('Method does not exist for this route');
}

async function _trace(req: Request, res: Response<any>) {
  res.status(500).send('Method does not exist for this route');
}

async function _options(req: Request, res: Response) {
  res.status(500).send('Method does not exist for this route');
}
