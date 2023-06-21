// import { UserPlus } from '@phosphor-icons/react';
import Link from 'next/link';

import { useEffect, useRef } from 'react';

import { User } from '@phosphor-icons/react';
import Page from '@/components/Page';
import StartLiveStreamModal from '@/components/StartliveStreamModal';
import useStream from '@/hooks/useStream';

export default function Perfil() {
  const { isStreaming, stream } = useStream()
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log('aaaaaaaa')
  useEffect(() => {
    if (stream && videoRef.current && isStreaming) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream, videoRef.current, isStreaming])

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
              <Link className="ml-4 text-sm capitalize underline font-normal" href="/stream">Assista</Link>

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
              Você está offline.
            </p>
          </div>
        )}

        <div className="bg-zinc-900 w-full h-full z-20">
          <div className="px-24 py-16">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center text-center justify-center object-cover h-18 rounded-full border-2 bg-purple-300">
                      <User size={32} />
                    </div>
                    <div className="font-semibold text-slate-700">
                      <h1 className="hover:underline">
                        <Link href="/perfil/luisss">
                          Você
                        </Link>
                      </h1>
                      <span className="text-gray-500 text-sm">10 Seguidores</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <StartLiveStreamModal />
              </div>
            </div>
            <div>
              <h2 className="mt-8 my-4 font-bold">Clips</h2>
              <ul>Sem clips</ul>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
