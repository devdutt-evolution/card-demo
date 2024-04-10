import { notFound, redirect } from 'next/navigation';
// process.env.NEXT_PUBLIC_URL_BACKEND;

export class FetchResponse<T> {
  res: Response;
  constructor(res: Response) {
    this.res = res;
  }
  getData() {
    return this.res.json() as Promise<T>;
  }
  isError() {
    return this.res.status !== 200 && this.res.status !== 201;
  }
  checkAuth() {
    if (this.res.status === 401) redirect('/login');
    else if (this.res.status === 403) redirect('/posts');
    else return this;
  }
  checkNotFound() {
    if (this.res.status === 404) notFound();
    else return this;
  }
  checkInternal() {
    if (this.res.status === 500) throw new Error('API failed');
    else return this;
  }
}
