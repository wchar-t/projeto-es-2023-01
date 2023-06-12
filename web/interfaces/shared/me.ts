import Session from './session';

export default interface Me {
  session: Session,
  jwt: string,
}
