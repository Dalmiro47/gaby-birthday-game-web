
import { RiddleGift } from './types';

// Using the new direct link provided by the user from ImgBB
export const DIOMEDES_IMAGE_URL = "https://i.ibb.co/Gv1yg5s9/Diomedes.jpg";

export const LEGO_IMAGE_URL = "https://i.ibb.co/cHTNnZg/Lego.png";
export const PATAGONIA_VOUCHER_IMAGE_URL = "https://i.ibb.co/4w9Hd4vr/Patagonia-Voucher.png";
export const PERFUME_IMAGE_URL = "https://i.ibb.co/xxpQD7V/Perfume.jpg";
export const WATCH_IMAGE_URL = "https://i.ibb.co/R4pWmSy0/Reloj.jpg";
export const PIJAMA_IMAGE_URL = "https://i.ibb.co/2YFs2j3m/Pijama.png";
export const VASO_IMAGE_URL = "https://i.ibb.co/mMGD7zB/Vaso.jpg";


export const WELCOME_TITLE = "¡Feliz cumpleaños, mi amor!";
export const WELCOME_MESSAGE = "Te tengo un jueguito de adivinanzas bien bacano. Cada vez que aciertes, te vas a llevar una sorpresita bien chévere. ¿Entonces, lista pa’ arrancar o qué?";

export const INCORRECT_ANSWER_AUDIO_URLS: string[] = [
  "https://audios-coste-os.vercel.app/nda_intenta_otra_vez.mp3",
  "https://audios-coste-os.vercel.app/hasta-ahi.mp3",
  "https://audios-coste-os.vercel.app/Nojoda.mp3"
];
export const HAPPY_BIRTHDAY_AUDIO_URL = "https://audios-coste-os.vercel.app/feliz_cumplea%C3%B1os.mp3";
export const CORRECT_ANSWER_AUDIO_URLS: string[] = [
  "https://audios-coste-os.vercel.app/viva-colombia-viva-falcao.mp3",
  "https://audios-coste-os.vercel.app/si-si-colombia.mp3",
  "https://audios-coste-os.vercel.app/aeae.mp3"
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
    from: "Dalmi",
  },
  {
    id: "perfume1",
    riddle: "Vengo en frasquito elegante y con solo un poquito, hueles más sabroso que sancocho en fogón de leña. ¿Qué soy, mi solecito?",
    answer: "perfume",
    giftName: "¡Un Perfume Pa' Que Huelas A Gloria Bendita!",
    giftDescription: "¡Pa' que dejes a la gente con la boca abierta y la nariz contenta, mi amor!",
    giftImageUrl: PERFUME_IMAGE_URL,
    from: "Ingrid y Richard",
  },
  {
    id: "reloj1",
    riddle: "En la muñeca te luces con pura elegancia, marco tus horas, ya sea pa' la rumba o la laburanza. No soy gallo, pero te aviso si la vida avanza. ¿Qué soy, mi vida, que te da tanta prestancia?",
    answer: "reloj",
    giftName: "¡Un Reloj Bien Bacano Pa' Medir Tus Momentos Felices!",
    giftDescription: "¡Pa' que siempre estés a tiempo pa' la alegría y el goce, mi reina! ¡Tic-tac, tic-tac, la felicidad no espera!",
    giftImageUrl: WATCH_IMAGE_URL,
    isLego: false,
    from: "Valeria y Jorge"
  },
  {
    id: "pijama1",
    riddle: "Tía Gaby, tía Gaby, pa' que duermas bien rico, te doy algo muy suavecito, ¡como un abracito! ¿Qué es, tía, pa' tus sueños bonitos?",
    answer: "pijama",
    giftName: "¡Un Pijama Suavecito de tu Sobri Franco!",
    giftDescription: "Pa' que sueñes con los angelitos y conmigo, tía. ¡Te quiero mucho!",
    giftImageUrl: PIJAMA_IMAGE_URL,
    isLego: false,
    from: "Franco (tu sobri)",
  },
  {
    id: "vaso1",
    riddle: "Tía, tía, ¡mira qué chévere! Pa' tu agüita o tu juguito. Tiene dibujitos y lo escogí yo, ¡con mucho amorcito! ¿Qué será, tía linda?",
    answer: "vaso",
    giftName: "¡Un Vaso Único de tu Sobri Consentido!",
    giftDescription: "¡Pa' que cada sorbito te recuerde cuánto te quiero, tía Gaby! ¡Mua!",
    giftImageUrl: VASO_IMAGE_URL,
    isLego: false,
    from: "Franco (tu sobri)",
  },
  {
    id: "patagonia1",
    riddle: "Mesa pa' dos, velitas y un plato bien sabroso. Es una noche pa' nosotros, puro goce y alborozo. ¿Qué lugar es ese, mi vida?",
    answer: "Patagonia",
    giftName: "¡Una Cena Espectacular en Patagonia!",
    giftDescription: "¡Pa' que disfrutes de los sabores de la Patagonia, mi amor! ¡Una experiencia única con la mejor carne!",
    giftImageUrl: PATAGONIA_VOUCHER_IMAGE_URL,
    isLego: false,
    from: "Dalmi",
  },
];