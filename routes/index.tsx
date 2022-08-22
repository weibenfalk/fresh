/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { Handlers, PageProps } from '$fresh/server.ts';

export const handler: Handlers<Array<string> | null> = {
  async GET(_, ctx) {
    const resp = await fetch('https://owen-wilson-wow-api.herokuapp.com/wows/movies');

    if (resp.status === 404) return ctx.render(null);

    const wow: Array<string> = await resp.json();

    return ctx.render(wow);
  }
};

export default function Home({ data }: PageProps<Array<string> | null>) {
  return (
    <div class={tw`p-4 text-center`}>
      {data?.map(movie => (
        <div>
          <a href={movie}>{movie}</a>
        </div>
      ))}
    </div>
  );
}
