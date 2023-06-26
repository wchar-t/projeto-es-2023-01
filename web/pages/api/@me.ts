import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import Session from '@/interfaces/shared/session';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  const doc = await prisma.user.findUnique({
    where: {
      id: req.session!.id,
    },
  });

  if (!doc) {
    return res.status(400).json({ error: { code: 'user_not_found', message: 'Usuário não encontrado' } });
  }

  const session: Session = {
    id: doc.id,
    username: doc.username,
    email: doc.email,
    bio: doc.bio,
    picture: doc.picture,
    createdAt: doc.createdAt,
  };

  return res.status(200).json({ error: false, result: session });
}

export default withSession(handler);
