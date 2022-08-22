/** @jsx h */
import { h } from 'preact';
import { Handlers, PageProps } from '$fresh/server.ts';
import { tw } from '@twind';

export interface Wow {
  movie: string;
  current_wow_in_movie: number;
  total_wows_in_movie: number;
  poster: string;
  video: {
    '720p': string;
  };
}

export const handler: Handlers<Array<Wow> | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;

    const resp = await fetch(`https://owen-wilson-wow-api.herokuapp.com/wows/random?movie=${name}`);

    if (resp.status === 404) return ctx.render(null);

    const wow: Array<Wow> = await resp.json();

    return ctx.render(wow);
  }
};

export default function Page({ data }: PageProps<Array<Wow> | null>) {
  if (!data || data.length === 0) {
    return <h1>Nothing found!</h1>;
  }

  return data.map(movie => (
    <div class={tw`p-4 mx-auto w-72`}>
      <img class={tw`pb-4`} src={movie.poster} width={320} />
      <video width='320' height='240' controls>
        <source src={movie.video['720p']} type='video/mp4' />
      </video>
      <p class={tw`text-center pt-4`}>Current wow: {movie.current_wow_in_movie}</p>
      <p class={tw`text-center`}>Number of wows: {movie.total_wows_in_movie}</p>
    </div>
  ));
}
