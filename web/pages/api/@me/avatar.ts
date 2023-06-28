import fsPromises from 'fs/promises';
import formidable from 'formidable'
import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import withMethod from '@/middlewares/method';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  // ignoring checks
  const form = formidable({});

  // Configure the form options if needed

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: { code: 'cant_upload', message: 'Erro no upload' } });
    }

    const pp = files.pp instanceof Array ? files.pp[0] : files.pp;
    const name = `${req.session!.id}.${(pp.originalFilename || '').split('.').slice(-1)[0]}`;
    await fsPromises.copyFile(pp.filepath, `./public/avatars/${name}`);
    await fsPromises.rm(pp.filepath);

    await prisma.user.update({
      where: {
        id: req.session!.id,
      },
      data: {
        picture: `/avatars/${name}`,
      },
    });

    return res.status(200).json({ error: false, result: 'Enviado com sucesso' });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withSession(withMethod(handler, ['PUT']));
