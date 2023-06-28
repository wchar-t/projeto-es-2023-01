import { PatriotasApiRequest } from '../interfaces/server/request';
import { PatriotasApiResponse } from '../interfaces/server/response';

export default function withMethod(
  handler: (req: PatriotasApiRequest, res: PatriotasApiResponse) => void,
  methods: string[],
) {
  return (req: PatriotasApiRequest, res: PatriotasApiResponse) => {
    if (!methods.includes(req.method ?? '')) {
      return res.status(405).json({ error: true, result: 'Método não permitido' });
    }

    if (req.method === 'POST') {
      const contentType = (req.headers?.['content-type'] || '').toLowerCase();
      if (contentType !== 'application/json') {
        return res.status(400).json({ error: true, result: 'Content-Type inválido' });
      }
    }

    return handler(req, res);
  };
}
