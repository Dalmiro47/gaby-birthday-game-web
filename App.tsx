
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, RiddleGift } from './types';
import {
  RIDDLES,
  WELCOME_TITLE,
  WELCOME_MESSAGE,
  DIOMEDES_IMAGE_URL,
  LEGO_IMAGE_URL,
  PATAGONIA_VOUCHER_IMAGE_URL, // Importar la nueva URL
  INCORRECT_ANSWER_AUDIO_URLS,
  HAPPY_BIRTHDAY_AUDIO_URL,
  CORRECT_ANSWER_AUDIO_URLS,
} from './constants';

// Helper function to determine appropriate alt text
const getDynamicAltText = (
    imageSrc: string | null,
    gameState: GameState,
    currentRiddle?: RiddleGift
  ): string => {
  if (!imageSrc) return "";

  if (gameState === GameState.RiddleIncorrect) {
    return "Diomedes Díaz reflexionando sobre tu respuesta. ¡Intenta de nuevo!";
  }

  if (gameState === GameState.RiddleCorrect && currentRiddle) {
    if (currentRiddle.isLego && imageSrc === LEGO_IMAGE_URL) {
      return `¡Correcto! Ganaste: ${currentRiddle.giftName}. Imagen de Lego.`;
    }
    if (currentRiddle.giftImageUrl && imageSrc === currentRiddle.giftImageUrl) {
      return `¡Correcto! Recompensa: ${currentRiddle.giftName}.`;
    }
    return `¡Respuesta correcta! Aquí tienes una sorpresa visual.`;
  }

  return "Imagen relacionada con la adivinanza o el resultado.";
};


const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [revealedGifts, setRevealedGifts] = useState<RiddleGift[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showSpecialImage, setShowSpecialImage] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [correctAudioIndex, setCorrectAudioIndex] = useState<number>(0);
  const [incorrectAudioIndex, setIncorrectAudioIndex] = useState<number>(0);

  useEffect(() => {
    audioPlayerRef.current = new Audio();

    const imagesToPreload = [
        DIOMEDES_IMAGE_URL,
        LEGO_IMAGE_URL,
        PATAGONIA_VOUCHER_IMAGE_URL, // Asegurarse que se precarga la nueva imagen
        ...RIDDLES.filter(r => r.giftImageUrl).map(r => r.giftImageUrl!)
    ].filter(Boolean).filter((value, index, self) => self.indexOf(value) === index); // Eliminar duplicados si los hubiera
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
  }, []);


  const resetForNextRiddle = useCallback(() => {
    setUserAnswer('');
    setFeedbackMessage('');
    setShowSpecialImage(null);
  }, []);

  const playAudio = (audioSrc: string) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current.src = audioSrc;
      audioPlayerRef.current.play().catch(error => {
        console.error(`Error al reproducir audio ${audioSrc}:`, error);
      });
    }
  };

  const handleAnswerSubmit = () => {
    const currentRiddle = RIDDLES[currentRiddleIndex];
    if (userAnswer.toLowerCase().trim() === currentRiddle.answer.toLowerCase().trim()) {
      setFeedbackMessage(`¡Ajá! ¡Esa es! ${currentRiddle.giftDescription}`);
      if (!revealedGifts.find(gift => gift.id === currentRiddle.id)) {
        setRevealedGifts(prev => [...prev, currentRiddle]);
      }
      if (currentRiddle.isLego) {
        setShowSpecialImage(LEGO_IMAGE_URL);
      } else if (currentRiddle.giftImageUrl) {
        setShowSpecialImage(currentRiddle.giftImageUrl);
      } else {
        setShowSpecialImage(null);
      }
      setGameState(GameState.RiddleCorrect);
      const audioToPlay = CORRECT_ANSWER_AUDIO_URLS[correctAudioIndex];
      playAudio(audioToPlay);
      setCorrectAudioIndex((prevIndex) => (prevIndex + 1) % CORRECT_ANSWER_AUDIO_URLS.length);
    } else {
      setFeedbackMessage("¡Ndaaa, mi reina! Esa no es. ¡Pilas ahí! Intenta otra vez.");
      setShowSpecialImage(DIOMEDES_IMAGE_URL);
      setGameState(GameState.RiddleIncorrect);
      const audioToPlay = INCORRECT_ANSWER_AUDIO_URLS[incorrectAudioIndex];
      playAudio(audioToPlay);
      setIncorrectAudioIndex((prevIndex) => (prevIndex + 1) % INCORRECT_ANSWER_AUDIO_URLS.length);
    }
  };

  const handleNextAction = () => {
    resetForNextRiddle();
    if (gameState === GameState.RiddleCorrect) {
      if (audioPlayerRef.current && CORRECT_ANSWER_AUDIO_URLS.includes(audioPlayerRef.current.src)) {
          audioPlayerRef.current.pause();
          audioPlayerRef.current.currentTime = 0;
      }
      if (currentRiddleIndex < RIDDLES.length - 1) {
        setCurrentRiddleIndex(prev => prev + 1);
        setGameState(GameState.Playing);
      } else {
        setGameState(GameState.GameOver);
        playAudio(HAPPY_BIRTHDAY_AUDIO_URL);
      }
    } else if (gameState === GameState.RiddleIncorrect) {
      if (audioPlayerRef.current && INCORRECT_ANSWER_AUDIO_URLS.includes(audioPlayerRef.current.src)) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      }
      setGameState(GameState.Playing);
    }
  };

  const startGame = () => {
    if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
    }
    resetForNextRiddle();
    setCurrentRiddleIndex(0);
    setRevealedGifts([]);
    setGameState(GameState.Playing);
    setCorrectAudioIndex(0);
    setIncorrectAudioIndex(0);
  };

  const renderStartScreen = () => (
    <div className="animate-fadeIn">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-colombia-yellow mb-6">{WELCOME_TITLE}</h1>
      <p className="text-lg sm:text-xl text-slate-200 mb-8 leading-relaxed">{WELCOME_MESSAGE}</p>
      <button
        onClick={startGame}
        className="w-full sm:w-auto bg-colombia-blue hover:bg-colombia-blue-dark text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105"
        aria-label="Iniciar el juego de adivinanzas"
      >
        ¡Va pa' esa!
      </button>
    </div>
  );

  const renderGameScreen = () => {
    const currentRiddle = RIDDLES[currentRiddleIndex];
    const isInputDisabled = gameState === GameState.RiddleCorrect || gameState === GameState.RiddleIncorrect;

    return (
      <div className="animate-fadeIn">
        <p className="text-sm text-colombia-blue-light font-semibold mb-2">Adivinanza {currentRiddleIndex + 1} de {RIDDLES.length}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-colombia-yellow mb-6">{currentRiddle.riddle}</h2>
        <form onSubmit={(e) => { e.preventDefault(); if (!isInputDisabled) handleAnswerSubmit(); }} className="space-y-6">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Escribe tu respuesta aquí, mi amor"
            className={`w-full bg-slate-700 text-slate-100 placeholder-slate-400 border-2 border-slate-600 rounded-lg p-4 text-lg focus:ring-2 focus:ring-colombia-yellow focus:border-transparent outline-none transition-colors ${isInputDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Respuesta a la adivinanza"
            aria-describedby="feedback-message"
            disabled={isInputDisabled}
          />
          <button
            type="submit"
            disabled={!userAnswer.trim() || isInputDisabled}
            className="w-full sm:w-auto bg-colombia-blue hover:bg-colombia-blue-dark text-white font-bold py-3 px-8 rounded-lg text-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            ¡Manda la Respuesta!
          </button>
        </form>
        {feedbackMessage && (
          <p id="feedback-message" className={`mt-6 text-lg font-semibold ${gameState === GameState.RiddleCorrect ? 'text-green-400' : 'text-colombia-red'}`} role="alert">
            {feedbackMessage}
          </p>
        )}
        {showSpecialImage && (
          <img
            src={showSpecialImage}
            alt={getDynamicAltText(showSpecialImage, gameState, currentRiddle)}
            className="mt-6 rounded-lg shadow-xl max-w-xs mx-auto max-h-64 h-auto w-auto object-contain animate-fadeIn" />
        )}
        {(gameState === GameState.RiddleCorrect || gameState === GameState.RiddleIncorrect) && (
          <button
            onClick={handleNextAction}
            className="mt-8 w-full sm:w-auto bg-colombia-yellow hover:bg-colombia-yellow-dark text-slate-900 font-bold py-3 px-8 rounded-lg text-xl shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            {gameState === GameState.RiddleCorrect
              ? (currentRiddleIndex < RIDDLES.length - 1 ? "¡Siguiente Adivinanza!" : "¡A Ver Mis Tesoros!")
              : "Intentar de Nuevo"}
          </button>
        )}
      </div>
    );
  };

  const renderGameOverScreen = () => (
    <div className="animate-fadeIn">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-colombia-yellow mb-6">¡Juepajé! ¡Terminaste, mi campeona!</h1>
      <p className="text-xl text-slate-200 mb-8">Mira todas las sorpresitas que te ganaste con tu inteligencia costeña:</p>
      <div className="space-y-4 max-h-96 overflow-y-auto bg-slate-700/50 p-4 rounded-lg custom-scrollbar">
        {revealedGifts.length > 0 ? (
          revealedGifts.map(gift => (
            <div key={gift.id} className="bg-slate-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-102">
              <h3 className={`text-2xl font-bold ${gift.isLego ? 'text-colombia-yellow' : 'text-colombia-blue-light'}`}>{gift.giftName} 🎁</h3>
              <p className="text-slate-300 mt-1">{gift.giftDescription}</p>
              {gift.giftImageUrl && (
                 <img src={gift.giftImageUrl} alt={`Imagen del premio: ${gift.giftName}`} className="mt-3 rounded-md max-h-48 h-auto w-auto mx-auto shadow-md" />
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-400">No se revelaron regalos aún. ¡Pero la fiesta sigue!</p>
        )}
      </div>
      <button
        onClick={startGame}
        className="mt-8 w-full sm:w-auto bg-colombia-blue hover:bg-colombia-blue-dark text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105"
        aria-label="Jugar de nuevo"
      >
        ¿Jugar de Nuevo? ¡Dale!
      </button>
    </div>
  );

  const renderContent = () => {
    switch (gameState) {
      case GameState.Start:
        return renderStartScreen();
      case GameState.Playing:
      case GameState.RiddleIncorrect:
      case GameState.RiddleCorrect:
        return renderGameScreen();
      case GameState.GameOver:
        return renderGameOverScreen();
      default:
        return <p className="text-colombia-yellow">Cargando el vacilón...</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-colombia-blue-dark via-slate-900 to-slate-800 text-slate-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-colombia-yellow selection:text-slate-900">
       <style>{`
        .animate-fadeIn { animation: fadeIn 0.7s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; border-radius:10px; } /* slate-800 */
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0052A5; border-radius: 10px; } /* colombia-blue */
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #003893; } /* colombia-blue-dark */

        .max-w-xs { max-width: 20rem/* 320px */; }
        .max-h-64 { max-height: 16rem/* 256px */; }
        .max-h-48 { max-height: 12rem/* 192px */; }

        img { max-width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto; }
      `}</style>
      <main className="bg-slate-800/80 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-lg lg:max-w-xl text-center border border-slate-700" role="main">
        {renderContent()}
      </main>
      <footer className="mt-8 text-center text-sm text-slate-400">
        <p>Hecho con todo el amor del mundo pa' mi Gaby. ¡Te amo!</p>
      </footer>
    </div>
  );
};

export default App;
