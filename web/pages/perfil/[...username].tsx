// import { UserPlus } from '@phosphor-icons/react';
import Link from 'next/link';

import Page from '@/components/Page';

export default function Perfil() {
  return (
    <Page padding={0}>
      <main className="flex flex-col items-start relative">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video absolute "
        />
        <div className="bg-zinc-800 z-20 mx-12 my-24 px-8 py-12 rounded w-96">
          <span className="bg-red-500 p-2 px-4 rounded font-bold text-slate-100">
            Ao vivo
          </span>

          <p className="text-2xl mt-4 font-bold">
            Confira esta transmissão de [NOME DA ULTIMA LIVE] realizada há 3 dias.
          </p>
        </div>
        <div className="bg-zinc-900 w-full z-20">
          <div className="px-24 py-16">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/e7224153-007a-4606-9c1b-46ad395e3000-profile_image-70x70.png" alt="" className="w-18 object-cover h-18 rounded-full border-2 border-purple-600" />
                    <div className="font-semibold text-slate-700">
                      <h1 className="hover:underline">
                        <Link href="/perfil/luisss">
                          luisss
                        </Link>
                      </h1>
                      <span className="text-gray-500 text-sm">10 Seguidores</span>
                    </div>
                  </div>
                </div>
              </div>
              <button title="Seguir luisss" type="button" className="rounded bg-purple-600 text-white px-6 py-2 font-semibold flex gap-2 cursor-pointer">
                {/* <UserPlus size={24} weight="bold" /> */}
                Seguir
              </button>
            </div>
            <div>
              <h2 className="mt-8 my-4 font-bold">Clips</h2>
              <ul className="flex gap-2">

                <li className=" flex flex-col items-start">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-100 aspect-video rounded"
                  />
                  <strong className="my-1">LIVE DE SÁBADO E COM VITÓRIA?</strong>
                  <small className="text-gray-400">Just chatting</small>
                </li>
                <li className=" flex flex-col items-start">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-100 aspect-video rounded"
                  />
                  <strong className="my-1">LIVE DE SÁBADO E COM VITÓRIA?</strong>
                  <small className="text-gray-400">Just chatting</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
