import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import withMethod from '@/middlewares/method';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  let { username }: { username: string } = req.body;

  if (!username || username.trim().length < 3) {
    return res.status(400).json({ error: { code: 'username_missing', message: 'Informe o usuário' } });
  }

  username = username.trim();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    return res.status(404).json({ error: { code: 'username_already_exists', message: 'Usuário já existe' } });
  }

  await prisma.user.update({
    where: { id: req.session!.id },
    data: { username },
  });

  return res.status(200).json({ error: false, result: 'Alterado com sucesso' });
}

export default withSession(withMethod(handler, ['POST']));
