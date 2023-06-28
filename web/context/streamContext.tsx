import {
  createContext, ReactNode, useState,
} from 'react'

interface StreamProviderContext {
  isStreaming: boolean;
  stream: MediaStream | null;
  // eslint-disable-next-line no-unused-vars
  addStream: (newStream: MediaStream) => void;
  startStream: () => void;
}

interface StreamProviderProps {
  children: ReactNode
}

export const streamContext = createContext({} as StreamProviderContext)

export default function StreamProvider({ children }: StreamProviderProps) {
  const [isStreaming, setIsStreaming] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  function addStream(newStream: MediaStream) {
    setStream(newStream)
  }

  function startStream() {
    setIsStreaming(true)
  }

  return (
    <streamContext.Provider value={{
      isStreaming, stream, addStream, startStream,
    }}
    >
      { children }
    </streamContext.Provider>
  )
}
