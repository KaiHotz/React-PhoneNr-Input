import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js'
import {
  ICountry,
  Identifyer,
  FindCountryBy,
  GetCountry,
  GetPreferredCountries,
  GetInitialCountry,
  GetCountryList,
  NumberFormat,
  FormatNumber,
  IsoCode,
} from '../types'
import { allCountries } from './allCountries'

export const findCountryBy: FindCountryBy = (identifyer: Identifyer, item: IsoCode | string) => allCountries.find(country => country[identifyer] === item || country[identifyer].startsWith(item)) || allCountries[0]

export const getCountry: GetCountry = (phoneNumber: string) => {
  let tel = phoneNumber

  if (phoneNumber.startsWith('+00')) {
    tel = phoneNumber.substring(5, 3)
  } else if (phoneNumber.startsWith('+')) {
    tel = phoneNumber.substring(6, 1)
  } else if (phoneNumber.startsWith('00')) {
    tel = phoneNumber.substring(5, 2)
  } else {
    tel = phoneNumber.substring(5, 0)
  }

  return allCountries.find(country => country.dialCode.startsWith(`+${tel.replace(' ', '')}`))
}

export const getCountriesByRegions = (regions: string[] | string): ICountry[] => {
  if (typeof regions === 'string') {
    return allCountries.filter(country => country.regions.includes(regions.toLowerCase()))
  }

  return allCountries.filter(country => regions.map(region => country.regions.includes(region.toLowerCase())).some(el => el))
}

export const getPreferredCountries: GetPreferredCountries = (preferredCountries: string[]) => preferredCountries.map(prefCountry => findCountryBy('iso2', prefCountry))

export const getInitialCountry: GetInitialCountry = (defaultCountry?: string, preferredCountries?: string[], regions?: string | string[]) => {
  if (defaultCountry) {
    return findCountryBy('iso2', defaultCountry)
  }

  if (preferredCountries?.length) {
    return findCountryBy('iso2', preferredCountries[0])
  }

  if (regions) {
    return getCountriesByRegions(regions)[0]
  }

  return allCountries[0]
}

export const getCountryList: GetCountryList = (preferredCountries?: string[], regions?: string | string[]) => {
  if (preferredCountries?.length) {
    return getPreferredCountries(preferredCountries)
  }

  if (regions) {
    return getCountriesByRegions(regions)
  }

  return allCountries.filter(country => country.iso2 !== 'INTL')
}

export const formatNumber: FormatNumber = (pohneNumber: string, format: NumberFormat, iso2: IsoCode) => {
  let fromatedPhoneNumber = pohneNumber

  if (format === 'INTERNATIONAL') {
    if (!fromatedPhoneNumber.startsWith('+')) {
      fromatedPhoneNumber = `+${fromatedPhoneNumber}`
    }
    if (fromatedPhoneNumber.startsWith('+00')) {
      fromatedPhoneNumber = fromatedPhoneNumber.replace('00', '')
    }
    if (fromatedPhoneNumber.startsWith('00')) {
      fromatedPhoneNumber = fromatedPhoneNumber.replace('00', '+')
    }
  }

  const parsedPhoneNumber = parsePhoneNumberFromString(fromatedPhoneNumber, iso2 as CountryCode)

  try {
    fromatedPhoneNumber = parsedPhoneNumber?.format(format) || ''
  } catch (e) {
    fromatedPhoneNumber = fromatedPhoneNumber.replace(/\(+-()\)/g, '')
  }

  return fromatedPhoneNumber
}
