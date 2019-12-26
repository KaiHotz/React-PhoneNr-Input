import { parsePhoneNumberFromString } from 'libphonenumber-js'
import allCountries from './allCountries'

const useCountries = () => {
  const findCountryBy = (identifyer, item) => allCountries.find(country => country[identifyer] === item)

  const getCountry = phoneNumber => {
    const tel = phoneNumber.startsWith('+') ? phoneNumber.slice(1, 6) : phoneNumber.slice(0, 5)

    return allCountries.find(country => country.dialCode.startsWith(`+${tel.replace(' ', '')}`))
  }

  const getCountriesByRegions = regions => {
    if (typeof regions === 'string') {
      return allCountries.filter(country => country.regions.includes(regions.toLowerCase()))
    }

    return allCountries.filter(country => regions.map(region => country.regions.includes(region.toLowerCase())).some(el => el))
  }

  const getPreferredCountries = preferredCountries => preferredCountries.map(prefCountry => findCountryBy('iso2', prefCountry.toLowerCase()))

  const getInitialCountry = (defaultCountry, preferredCountries, regions) => (
    defaultCountry
      ? findCountryBy('iso2', defaultCountry.toLowerCase())
      : preferredCountries.length
        ? findCountryBy('iso2', preferredCountries[0].toLowerCase())
        : regions
          ? getCountriesByRegions(regions)[0]
          : findCountryBy('iso2', 'intl')
  )

  const getCountryList = (preferredCountries, regions) => (
    preferredCountries.length
      ? getPreferredCountries(preferredCountries)
      : regions
        ? getCountriesByRegions(regions)
        : allCountries
  )

  const formatNumber = (number, format, iso2) => {
    let fromatedPhoneNumber = number

    if (format === 'INTERNATIONAL') {
      if (!fromatedPhoneNumber.startsWith('+')) {
        fromatedPhoneNumber = `+${fromatedPhoneNumber}`
      }
      if (fromatedPhoneNumber.startsWith('+00')) {
        fromatedPhoneNumber = fromatedPhoneNumber.replace('00', '')
      }
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(fromatedPhoneNumber, iso2.toUpperCase())

    try {
      fromatedPhoneNumber = parsedPhoneNumber.format(format)
    } catch (e) {
      fromatedPhoneNumber = fromatedPhoneNumber.replace(/\(+-()\)/g, '')
    }

    return fromatedPhoneNumber
  }

  return [findCountryBy, formatNumber, getCountry, getInitialCountry, getCountryList]
}

export default useCountries
