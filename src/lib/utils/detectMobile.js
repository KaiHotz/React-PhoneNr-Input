const windowsObj = typeof window !== 'undefined'

const detectMobile = {
  Android: () => windowsObj && navigator.userAgent.match(/Android/i),
  BlackBerry: () => windowsObj && navigator.userAgent.match(/BlackBerry/i),
  iOS: () => windowsObj && navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => windowsObj && navigator.userAgent.match(/Opera Mini/i),
  Windows: () => windowsObj && navigator.userAgent.match(/IEMobile/i),
  any: () => (detectMobile.Android() || detectMobile.BlackBerry() || detectMobile.iOS() || detectMobile.Opera() || detectMobile.Windows()),
}

export default detectMobile
