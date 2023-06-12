import { NextApiRequest } from 'next';
import Session from '../shared/session';

export interface PatriotasApiRequest extends NextApiRequest {
  session?: Session,
}
