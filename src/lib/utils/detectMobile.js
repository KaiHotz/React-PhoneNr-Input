const detectMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () => (detectMobile.Android() || detectMobile.BlackBerry() || detectMobile.iOS() || detectMobile.Opera() || detectMobile.Windows()),
}

export default detectMobile
