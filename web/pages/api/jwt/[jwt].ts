import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import withMethod from '@/middlewares/method';
import { decrypt } from '@/middlewares/session';

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  const { jwt }: { jwt: string } = req.query as { jwt: string };
  const decrypted = decrypt(jwt);

  if (!decrypted) {
    return res.status(401).json({ error: { code: 'not_authorized', message: 'Não autenticado' } });
  }

  return res.status(200).json({ error: false, result: decrypted });
}

export default withMethod(handler, ['GET']);
