import { useEffect, useState } from 'react';

const CountdownVideo = () => {
  const [isFocused, setIsFocused] = useState(true);
  const [countdown, setCountdown] = useState(10); 
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const videoElement = document.querySelector('video');

    videoElement.addEventListener('focus', handleFocus);
    videoElement.addEventListener('blur', handleBlur);

    return () => {
      videoElement.removeEventListener('focus', handleFocus);
      videoElement.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    let countdownInterval;

    if (isFocused && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
        console.log('Countdown:', countdown);
      }, 1000);
    }

    if (!isFocused) {
      clearInterval(countdownInterval);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isFocused, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      handleCountdownEnd(); 
      setCountdown(10);
      setPoints(prevPoints => prevPoints + 1);
    }
  }, [countdown]);

  const handleCountdownEnd = () => {
    console.log('Contagem regressiva chegou a 0! Você ganhou um ponto.');
  };

  return (
    <div className="flex items-center ml-8">
      <p className="mr-4 bg-white rounded-lg p-2 text-black font-semibold">
        <span className="font-bold">Pontos Ganhos:</span> {points}
      </p>
      <p className="bg-white rounded-lg p-2 text-black font-semibold">
        <span className="font-bold">Mais pontos em:</span> {countdown}s
      </p>
    </div>
  );
};

export default CountdownVideo;
