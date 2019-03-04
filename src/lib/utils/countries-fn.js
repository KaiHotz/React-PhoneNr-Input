import allCountries from './allCountries'

export const findCountryBy = (identifyer, item) => allCountries.find(country => country[identifyer] === item)

export const getCountry = phoneNumber => {
  let tel
  if (phoneNumber.startsWith('+')) {
    tel = phoneNumber.substring(1, 5)
  } else if (phoneNumber.startsWith('00')) {
    tel = phoneNumber.substring(2, 6)
  } else {
    tel = phoneNumber.substring(0, 4)
  }

  return allCountries.find(country => country.dialCode.startsWith(tel))
}

export const getCountriesByRegions = regions => {
  if (typeof regions === 'string') {
    return allCountries.filter(country => country.regions.includes(regions.toLowerCase()))
  }

  return allCountries.filter(country => regions.map(region => country.regions.includes(region.toLowerCase())).some(el => el))
}

export const getPreferredCountries = preferredCountries => preferredCountries.map(prefCountry => findCountryBy('iso2', prefCountry))

export const getInitialCountry = (defaultCountry, preferredCountries, regions) => (
  defaultCountry
    ? findCountryBy('iso2', defaultCountry)
    : preferredCountries.length
      ? findCountryBy('iso2', preferredCountries[0])
      : regions
        ? getCountriesByRegions(regions)[0]
        : findCountryBy('iso2', 'us')
)

export const getCountryList = (preferredCountries, regions) => (
  preferredCountries.length
    ? getPreferredCountries(preferredCountries)
    : regions
      ? getCountriesByRegions(regions)
      : allCountries
)
