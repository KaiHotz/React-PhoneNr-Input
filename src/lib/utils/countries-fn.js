import allCountries from './allCountries'

export const findCountryBy = (identifyer, item) => allCountries.find(country => country[identifyer] === item)

export const getCountry = phoneNumber => {
  const tel = phoneNumber.startsWith('+') ? phoneNumber.substring(1, 6) : phoneNumber.substring(0, 5)

  return allCountries.find(country => country.dialCode.startsWith(`+${tel.replace(' ', '')}`))
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
        : findCountryBy('iso2', 'intl')
)

export const getCountryList = (preferredCountries, regions) => (
  preferredCountries.length
    ? getPreferredCountries(preferredCountries)
    : regions
      ? getCountriesByRegions(regions)
      : allCountries
)
