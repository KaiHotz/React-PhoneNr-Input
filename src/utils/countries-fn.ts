import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
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
  Region,
} from '../types';
import { allCountries } from './allCountries';

export const findCountryBy: FindCountryBy = (identifyer: Identifyer, item: IsoCode | string) =>
  allCountries.find((country) => country[identifyer].startsWith(item)) || allCountries[0];

export const getCountry: GetCountry = (phoneNumber: string) => {
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

export const getPreferredCountries: GetPreferredCountries = (preferredCountries: IsoCode[]) =>
  preferredCountries.map((prefCountry) => findCountryBy('iso2', prefCountry));

export const getInitialCountry: GetInitialCountry = (
  defaultCountry?: IsoCode,
  preferredCountries?: IsoCode[],
  regions?: Region | Region[],
) => {
  if (defaultCountry) {
    return findCountryBy('iso2', defaultCountry);
  }

  if (preferredCountries?.length) {
    return findCountryBy('iso2', preferredCountries[0]);
  }

  if (regions?.length) {
    return getCountriesByRegions(regions)[0];
  }

  return allCountries[0];
};

export const getCountryList: GetCountryList = (preferredCountries?: IsoCode[], regions?: Region | Region[]) => {
  if (preferredCountries?.length) {
    return getPreferredCountries(preferredCountries);
  }

  if (regions) {
    return getCountriesByRegions(regions);
  }

  return allCountries.filter((country) => country.iso2 !== 'NO_FLAG');
};

export const formatNumber: FormatNumber = (pohneNumber: string, format: NumberFormat, iso2: IsoCode) => {
  let fromatedPhoneNumber = pohneNumber;

  if (format === 'INTERNATIONAL') {
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

  const parsedPhoneNumber = parsePhoneNumberFromString(fromatedPhoneNumber, iso2 as CountryCode);

  try {
    fromatedPhoneNumber = parsedPhoneNumber?.format(format) || '';
  } catch (e) {
    fromatedPhoneNumber = fromatedPhoneNumber.replace(/\(+-()\)/g, '');
  }

  return fromatedPhoneNumber;
};
