import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import withMethod from '@/middlewares/method';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  let { password, repassword }: { password: string, repassword: string } = req.body;

  password = '' || password;
  repassword = '' || repassword;

  if (password.length < 3 || repassword.length < 3) {
    return res.status(400).json({ error: { code: 'password_missing', message: 'Informe a senha' } });
  }

  if (password !== repassword) {
    return res.status(400).json({ error: { code: 'password_not_match', message: 'As senhas não coincidem' } });
  }

  await prisma.user.update({
    where: { id: req.session!.id },
    data: { password },
  });

  return res.status(200).json({ error: false, result: 'Alterado com sucesso' });
}

export default withSession(withMethod(handler, ['POST']));
