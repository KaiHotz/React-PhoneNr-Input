const hasWindowObj = typeof window !== 'undefined'

const detectMobile = {
  Android: () => hasWindowObj && window.navigator.userAgent.match(/Android/i),
  BlackBerry: () => hasWindowObj && window.navigator.userAgent.match(/BlackBerry/i),
  iOS: () => hasWindowObj && window.navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => hasWindowObj && window.navigator.userAgent.match(/Opera Mini/i),
  Windows: () => hasWindowObj && window.navigator.userAgent.match(/IEMobile/i),
  any: () => (detectMobile.Android() || detectMobile.BlackBerry() || detectMobile.iOS() || detectMobile.Opera() || detectMobile.Windows()),
}

export default detectMobile
