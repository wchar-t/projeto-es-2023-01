import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Box,
  Text,
  AspectRatio,
} from '@chakra-ui/react';

import { VideoCamera } from '@phosphor-icons/react'
import { useRef } from 'react';

export default function StartLiveStreamModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const videoRef = useRef<HTMLVideoElement>(null);

  function setStream(stream: MediaStream) {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }

  async function handleUserWebcam() {
    if (!videoRef.current) return

    videoRef.current.srcObject = null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'environment' },
      });

      setStream(stream)
    } catch (err) {
      console.log('Web cam não encontrada')
    }
  }

  async function handleUserDisplay() {
    if (!videoRef.current) return

    videoRef.current.srcObject = null;

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia()

      setStream(stream)
    } catch (err) {
      console.log('Nenhuma fonte de mídia foi selecionada encontrada')
    }
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
              <Button w="100%" onClick={() => handleUserWebcam}>Transmitir Câmera</Button>
              <Button w="100%" onClick={() => handleUserDisplay}>Transmitir Tela</Button>
            </Box>

            <Box mt={4} mb={12}>
              <AspectRatio minW="200px" ratio={16 / 9} bg="red">
                <video ref={videoRef} />
              </AspectRatio>
            </Box>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Iniciar transmissão
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
