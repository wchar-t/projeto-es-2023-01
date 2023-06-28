import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  const { email }: { email: string } = req.body;
  console.log(req.body)

  await prisma.user.update({
    where: {
      id: req.session!.id,
    },
    data: {
      email,
    },
  });

  return res.status(200).json({ error: false, result: 'Email alterado' });
}

export default withSession(handler);
