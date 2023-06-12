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
import { useEffect, useRef } from 'react';

export default function StartLiveStreamModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const videoRef = useRef<HTMLVideoElement>(null);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'environment' },
      });
      if (stream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.log('Sem fonte de media')
    }
  }

  useEffect(() => {
    getMedia()

    global.navigator?.mediaDevices.addEventListener('devicechange', () => {
      getMedia()
    })
  }, [global.navigator?.mediaDevices])

  return (
    <>
      <Button onClick={onOpen}>Iniciar live</Button>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Iniciar live</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight="600">Telas</Text>
              <AspectRatio maxW="500px" ratio={16 / 9} bg="red">
                <video ref={videoRef} />
              </AspectRatio>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="purple" onClick={onClose}>
              Iniciar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
