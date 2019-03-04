import allCountries from './allCountries'

export const findBy = (identifyer, item) => allCountries.find(country => country[identifyer] === item)

export const guess = phoneNumber => {
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

export const getRegions = regions => {
  if (typeof regions === 'string') {
    return allCountries.filter(country => country.regions.includes(regions.toLowerCase()))
  }

  return allCountries.filter(country => regions.map(region => country.regions.includes(region.toLowerCase())).some(el => el))
}

export const getPreferred = preferredCountries => preferredCountries.map(prefCountry => findBy('iso2', prefCountry))

export const getInitial = (defaultCountry, preferredCountries, regions) => (
  defaultCountry
    ? findBy('iso2', defaultCountry)
    : preferredCountries.length
      ? findBy('iso2', preferredCountries[0])
      : regions
        ? getRegions(regions)[0]
        : findBy('iso2', 'us')
)

export const getList = (preferredCountries, regions) => (
  preferredCountries.length
    ? getPreferred(preferredCountries)
    : regions
      ? getRegions(regions)
      : allCountries
)
