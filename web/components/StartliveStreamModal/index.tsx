import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
  useDisclosure,
  Box,
  Text,
  AspectRatio,
} from '@chakra-ui/react';

import { VideoCamera } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react';
import useStream from '@/hooks/useStream';

export default function StartLiveStreamModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { addStream, stream, startStream } = useStream()

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream, videoRef.current])

  async function handleUserWebcam() {
    if (!videoRef.current) return

    videoRef.current.srcObject = null;

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'environment' },
      });

      addStream(newStream)
    } catch (err) {
      console.log('Web cam não encontrada')
    }
  }

  async function handleUserDisplay() {
    if (!videoRef.current) return

    videoRef.current.srcObject = null;

    try {
      const newStream = await navigator.mediaDevices.getDisplayMedia()

      addStream(newStream)
    } catch (err) {
      console.log('Nenhuma fonte de mídia foi selecionada encontrada')
    }
  }

  function handleStartStream() {
    startStream()
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Iniciar live</Button>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={12}>
            <Box mb={8} display="flex" alignItems="center" flexDirection="column">
              <Box p={8} mb={2} backgroundColor="purple.900" borderRadius="100%">
                <VideoCamera size={32} />
              </Box>
              <Text fontSize="xl" fontWeight={600}>Configurando Transmissão</Text>
            </Box>

            <Box display="flex" gap={3}>
              <Button w="100%" onClick={() => handleUserWebcam()}>Transmitir Câmera</Button>
              <Button w="100%" onClick={() => handleUserDisplay()}>Transmitir Tela</Button>
            </Box>

            <Box mt={4} mb={12}>
              <AspectRatio minW="200px" ratio={16 / 9} bg="blackAlpha.600" borderRadius={10}>
                <video muted ref={videoRef} />
              </AspectRatio>
            </Box>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" onClick={() => handleStartStream()}>
              Iniciar transmissão
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
