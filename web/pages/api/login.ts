import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import { encrypt as encryptJwt } from '@/middlewares/session';
import withMethod from '@/middlewares/method';
import prisma from '../../schema/client';
import Session from '@/interfaces/shared/session';

interface params {
  username: string,
  password: string,
}

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  const { username, password }: params = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  const doc = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!doc) {
    return res.status(400).json({ error: { code: 'user_not_found', message: 'Usuário não encontrado' } });
  }

  if (doc.password !== password) {
    return res.status(400).json({ error: { code: 'invalid_password', message: 'Senha inválida' } });
  }

  const session: Session = doc;

  const jwt = encryptJwt(session);

  return res.status(200).json({ error: false, result: { jwt } });
}

export default withMethod(handler, ['POST']);
