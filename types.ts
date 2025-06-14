
export enum GameState {
  Start,
  Playing,
  RiddleCorrect,
  RiddleIncorrect,
  GameOver,
}

export interface RiddleGift {
  id: string;
  riddle: string;
  answer: string;
  giftName: string;
  giftDescription: string;
  giftImageUrl?: string;
  isLego?: boolean;
  from?: string; // Nuevo campo para el remitente del regalo
}
