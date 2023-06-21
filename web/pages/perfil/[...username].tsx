// import { UserPlus } from '@phosphor-icons/react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useRef } from 'react';

import Page from '@/components/Page';

const USERS = [
  {
    username: 'SicK_TV',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/5c4cd414-101a-422c-ad1b-11d2d9b31246-profile_image-70x70.png',
    videos: [
      {
        link: 'https://youtube.com/embed/knrK2WqCNCU',
        title: 'THIS is the SECRET to my Insane Aim?',
      },
      {
        link: 'https://www.youtube.com/embed/oi_U5eXmNNw',
        title: 'I FOUND MY *NEW* BEST FRIEND IN A BRAZIL MATCHMAKING | SEN SicK',
      },
    ],
  },
  {
    username: 'alanzoka',
    avatar: 'https://yt3.googleusercontent.com/ytc/AGIKgqMcLFqcH7aZuBRihSbFmUk3pCkAulLv7SEgJPzq=s176-c-k-c0x00ffffff-no-rj',
    videos: [
      {
        link: 'https://www.youtube.com/embed/GvpUSw3I66s',
        title: 'alanzoka jogando Aliens: Dark Descent - #1',
      },
      {
        link: 'https://www.youtube.com/embed/GINuKibeXo0',
        title: 'alanzoka jogando CS: GO - #47',
      },
    ],
  },
  {
    username: 'RonaldoTV',
    avatar: 'https://yt3.ggpht.com/vhYGgxXhGVUwVI2thDQskSRrMHOzdcAH7fPSEmj_uNkk9S6qFZ8UJz5BNwBLMktNehXBAZJR=s176-c-k-c0x00ffffff-no-rj-mo',
    videos: [
      {
        link: 'https://www.youtube.com/embed/iu7ykZ1JmoM',
        title: 'RONALDO BRILHANDO NO WARZONE #1 | Cortes RonaldoTV',
      },
      {
        link: 'https://www.youtube.com/embed/QZAc3FUBfx0',
        title: 'RONALDO BRILHANDO NO WARZONE #2 | Cortes RonaldoTV',
      },
    ],
  },
  {
    username: 'Aleksis007',
    avatar: 'https://yt3.googleusercontent.com/vE1vjc1kD1TmO_y3LckbYoNVuDoFJm80Gcm2oiaXigLo13yYIpD9TCZlsB3CjUnFhu3KLUMK=s176-c-k-c0x00ffffff-no-rj',
    videos: [
      {
        link: 'https://www.youtube.com/embed/Px3E6osQr0o',
        title: 'Why is this OP? Aphelios Season 13',
      },
      {
        link: 'https://www.youtube.com/embed/7Wk_kz5ST_Y',
        title: 'The Rank 1 Aphelios Experience | Season 13',
      },
    ],
  },
]
export default function Perfil() {
  const router = useRouter()

  const { username } = router.query
  const userData = username && USERS.find((user) => user.username === username[0])

  const isStreaming = false
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Page padding={0}>
      <main className={`flex h-full flex-col items-start relative ${!isStreaming ? 'bg-purple-600' : ''}`}>
        {isStreaming ? (
          <>
            <video muted ref={videoRef} className="w-full aspect-video absolute " />
            <div className="bg-zinc-800 z-20 mx-12 my-32 px-8 py-12 rounded w-96">
              <span className="bg-red-500 p-2 px-4 rounded font-bold text-slate-100">
                Ao vivo
              </span>

              <p className="text-2xl mt-4 font-bold">
                Confira esta transmissão de [NOME DA ULTIMA LIVE] realizada há 3 dias.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-zinc-800 z-20 mx-12 my-24 px-8 py-12 rounded w-96">
            <span className="bg-gray-100 p-2 px-4 rounded font-bold text-zinc-800 text-sm">
              Offline
            </span>

            <p className="text-2xl mt-4 font-bold">
              {username} está offline.
            </p>
          </div>
        )}

        <div className="bg-zinc-900 w-full h-full z-20">
          <div className="px-24 py-16">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <img src={userData && userData?.avatar} alt="" className="w-16 object-cover h-18 rounded-full border-2 border-purple-600" />
                    <div className="font-semibold text-slate-700">
                      <h1 className="hover:underline">
                        <Link href="/perfil/luisss">
                          {username}
                        </Link>
                      </h1>
                      <span className="text-gray-500 text-sm">10 Seguidores</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button title="Seguir luisss" type="button" className="rounded bg-purple-600 text-white px-6 py-2 font-semibold flex gap-2 cursor-pointer">
                  Seguir
                </button>
              </div>
            </div>
            <div>
              <h2 className="mt-8 my-4 font-bold">Clips</h2>
              <ul className="flex gap-2">
                {userData && userData?.videos.map((video) => (
                  <li className=" flex flex-col items-start">
                    <iframe
                      src={video.link}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-96 aspect-video rounded"
                    />
                    <strong className="my-1">{video.title}</strong>
                    <small className="text-gray-400">Just chatting</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
