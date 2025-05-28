
import { RiddleGift } from './types';

// Using the new direct link provided by the user from ImgBB
export const DIOMEDES_IMAGE_URL = "https://i.ibb.co/Gv1yg5s9/Diomedes.jpg";

export const LEGO_IMAGE_URL = "https://i.ibb.co/cHTNnZg/Lego.png"; // Correct Lego image from ImgBB
export const PATAGONIA_VOUCHER_IMAGE_URL = "https://i.ibb.co/4w9Hd4vr/Patagonia-Voucher.png";

export const WELCOME_TITLE = "¡Feliz cumpleaños, mi amor!"; // Updated welcome title
export const WELCOME_MESSAGE = "Te tengo un jueguito de adivinanzas bien bacano. Cada vez que aciertes, te vas a llevar una sorpresita bien chévere. ¿Entonces, lista pa’ arrancar o qué?";

export const INCORRECT_ANSWER_AUDIO_URLS: string[] = [
  "https://audios-coste-os.vercel.app/nda_intenta_otra_vez.mp3",
  "https://audios-coste-os.vercel.app/hasta-ahi.mp3"
];
export const HAPPY_BIRTHDAY_AUDIO_URL = "https://audios-coste-os.vercel.app/feliz_cumplea%C3%B1os.mp3";
export const CORRECT_ANSWER_AUDIO_URLS: string[] = [
  "https://audios-coste-os.vercel.app/viva-colombia-viva-falcao.mp3",
  "https://audios-coste-os.vercel.app/si-si-colombia.mp3"
];

export const RIDDLES: RiddleGift[] = [
  {
    id: "lego1",
    riddle: "Soy un reguero de fichitas de colores, que si las juntas con maña, armas desde casas hasta tractores. ¿Qué soy, pa' que juegues horas y horas, mi Gaby bella?",
    answer: "lego",
    giftName: "¡Un Set de Lego pa' la Arquitecta de la Casa!",
    giftDescription: "¡Ahora sí, a construir tus sueños bloque por bloque, mi reina! ¡Qué nota!",
    giftImageUrl: LEGO_IMAGE_URL,
    isLego: true,
  },
  {
    id: "perfume1",
    riddle: "Vengo en frasquito elegante y con solo un poquito, hueles más sabroso que sancocho en fogón de leña. ¿Qué soy, mi solecito?",
    answer: "perfume",
    giftName: "¡Un Perfume Pa' Que Huelas A Gloria Bendita!",
    giftDescription: "¡Pa' que dejes a la gente con la boca abierta y la nariz contenta, mi amor!",
  },
  {
    id: "patagonia1", // ID actualizado para reflejar el nuevo regalo
    riddle: "Mesa pa' dos, velitas y un plato bien sabroso. Es una noche pa' nosotros, puro goce y alborozo. ¿Qué lugar es ese, mi vida?", // Pregunta actualizada
    answer: "Patagonia", // Respuesta actualizada
    giftName: "¡Una Cena Espectacular en Patagonia!", // Nombre del regalo actualizado
    giftDescription: "¡Pa' que disfrutes de los sabores de la Patagonia, mi amor! ¡Una experiencia única con la mejor carne!", // Descripción actualizada
    giftImageUrl: PATAGONIA_VOUCHER_IMAGE_URL, // Imagen actualizada
    isLego: false,
  },
  {
    id: "zapatillas1",
    riddle: "Te llevan pa' la tienda o a bailar champeta, y si te las pones, ¡uy!, pareces una saeta. ¿Qué son, mi vida, pa' que camines bien coqueta?",
    answer: "tenis",
    giftName: "¡Unas Zapatillas Pa' Que Pises Duro y Con Estilo!",
    giftDescription: "¡Pa' que recorras el mundo o la pista de baile, siempre cómoda y a la moda, mi reina!",
  }
];
