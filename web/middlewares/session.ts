import jsonwebtoken from 'jsonwebtoken';
import { PatriotasApiRequest } from '../interfaces/server/request';
import { PatriotasApiResponse } from '../interfaces/server/response';
import Session from '../interfaces/shared/session';

export function decrypt(jwt: string | null): Session | boolean {
  if (!jwt) {
    return false;
  }

  try {
    const token = jsonwebtoken.verify(jwt, process.env.JWT_TOKEN || '') as Session;
    return token;
  } catch (e) {
    return false;
  }
}

export function encrypt(data: string | object): string {
  return jsonwebtoken.sign(data, process.env.JWT_TOKEN || '', { noTimestamp: true });
}

export default function withSession(
  handler: (req: PatriotasApiRequest, res: PatriotasApiResponse) => void,
): any {
  return async (req: PatriotasApiRequest, res: PatriotasApiResponse) => {
    const session = decrypt((req.headers?.authorization || '').replace('Bearer ', ''));

    if (!session) {
      return res.status(401).json({ error: { code: 'not_authorized', message: 'Não autenticado' } });
    }

    req.session = (session as Session);

    return handler(req, res);
  };
}
