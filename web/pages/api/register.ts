import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import { encrypt as encryptJwt } from '@/middlewares/session';
import withMethod from '@/middlewares/method';
import prisma from '../../schema/client';
import Session from '@/interfaces/shared/session';

interface params {
  username: string,
  email: string,
  password: string,
}

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  let { username, email, password }: params = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  username = username.trim();
  email = email.trim().toLowerCase();

  // todo: data validation

  const d1 = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (d1) {
    return res.status(400).json({ error: { code: 'username_already_exists', message: 'Nome de usuário já existe' } });
  }

  const d2 = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (d2) {
    return res.status(400).json({ error: { code: 'email_already_exists', message: 'Email já existe' } });
  }

  const doc = await prisma.user.create({
    data: {
      username,
      email,
      password,
      picture: process.env.DEFAULT_USER_PICTURE as string,
    },
  });

  const session: Session = {
    id: doc.id,
    username: doc.username,
    email: doc.email,
    bio: doc.bio,
    picture: doc.picture,
    createdAt: doc.createdAt,
  };

  const jwt = encryptJwt(session);

  return res.status(200).json({ error: false, result: { jwt } });
}

export default withMethod(handler, ['POST']);
