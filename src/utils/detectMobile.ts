import { DetectMobile } from "../types";

export const hasWindowObj = typeof window !== "undefined";

export const detectMobile = {
  Android: (): DetectMobile =>
    hasWindowObj && window.navigator.userAgent.match(/Android/i),
  BlackBerry: (): DetectMobile =>
    hasWindowObj && window.navigator.userAgent.match(/BlackBerry/i),
  iOS: (): DetectMobile =>
    hasWindowObj && window.navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: (): DetectMobile =>
    hasWindowObj && window.navigator.userAgent.match(/Opera Mini/i),
  Windows: (): DetectMobile =>
    hasWindowObj && window.navigator.userAgent.match(/IEMobile/i),
  any: (): DetectMobile =>
    detectMobile.Android() ||
    detectMobile.BlackBerry() ||
    detectMobile.iOS() ||
    detectMobile.Opera() ||
    detectMobile.Windows(),
};
