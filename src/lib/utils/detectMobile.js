const { userAgent } = window?.navigator

const detectMobile = {
  Android: () => userAgent.match(/Android/i),
  BlackBerry: () => userAgent.match(/BlackBerry/i),
  iOS: () => userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => userAgent.match(/Opera Mini/i),
  Windows: () => userAgent.match(/IEMobile/i),
  any: () => (detectMobile.Android() || detectMobile.BlackBerry() || detectMobile.iOS() || detectMobile.Opera() || detectMobile.Windows()),
}

export default detectMobile
