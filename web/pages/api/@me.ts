import { PatriotasApiRequest } from '@/interfaces/server/request';
import { PatriotasApiResponse } from '@/interfaces/server/response';
import withSession from '@/middlewares/session';

async function handler(req: PatriotasApiRequest, res: PatriotasApiResponse) {
  return res.status(200).json({ error: false, result: req.session });
}

export default withSession(handler);
