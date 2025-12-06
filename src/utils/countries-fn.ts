import { type CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

import type { ICountry, NumberFormat, Region } from '../types';
import { allCountries } from './allCountries';

export const findCountryByCode = (code?: CountryCode) => allCountries.find((country) => country.iso2 === code);

export const getCountryByDialCode = (phoneNumber: string) => {
  let tel = phoneNumber;

  if (phoneNumber.startsWith('+00')) {
    tel = phoneNumber.substring(5, 3);
  } else if (phoneNumber.startsWith('+')) {
    tel = phoneNumber.substring(6, 1);
  } else if (phoneNumber.startsWith('00')) {
    tel = phoneNumber.substring(5, 2);
  } else {
    tel = phoneNumber.substring(5, 0);
  }

  return allCountries.find((country) => country.dialCode.startsWith(`+${tel.replace(' ', '')}`));
};

export const getCountriesByRegions = (regions: Region[] | Region): ICountry[] => {
  if (typeof regions === 'string') {
    return allCountries.filter((country) => country.regions.includes(regions));
  }

  return allCountries.filter((country) => regions.map((region) => country.regions.includes(region)).some((el) => el));
};

export const getInitialCountry = (defaultCountry?: CountryCode, preferredCountries?: CountryCode[], regions?: Region | Region[]) => {
  if (defaultCountry) {
    return findCountryByCode(defaultCountry);
  }

  if (preferredCountries) {
    return findCountryByCode(preferredCountries[0]);
  }

  if (regions) {
    return getCountriesByRegions(regions)[0];
  }

  return undefined;
};

export const getCountryList = (preferredCountries?: CountryCode[], regions?: Region | Region[]) => {
  if (preferredCountries) {
    return preferredCountries.map((prefCountry) => findCountryByCode(prefCountry));
  }

  if (regions) {
    return getCountriesByRegions(regions);
  }

  return allCountries;
};

export const formatNumber = (pohneNumber: string, format: NumberFormat, iso2: CountryCode) => {
  let fromatedPhoneNumber = pohneNumber;

  if (format === 'INTERNATIONAL' && pohneNumber.length > 0) {
    if (!fromatedPhoneNumber.startsWith('+')) {
      fromatedPhoneNumber = `+${fromatedPhoneNumber}`;
    }
    if (fromatedPhoneNumber.startsWith('+00')) {
      fromatedPhoneNumber = fromatedPhoneNumber.replace('00', '');
    }
    if (fromatedPhoneNumber.startsWith('00')) {
      fromatedPhoneNumber = fromatedPhoneNumber.replace('00', '+');
    }
  }

  const parsedPhoneNumber = parsePhoneNumberFromString(fromatedPhoneNumber, iso2);

  try {
    fromatedPhoneNumber = parsedPhoneNumber?.format(format) || '';
  } catch (error) {
    console.error(error);
    fromatedPhoneNumber = fromatedPhoneNumber.replace(/^\s+|(?<!\s)\s+$/g, '');
  }

  return fromatedPhoneNumber;
};
