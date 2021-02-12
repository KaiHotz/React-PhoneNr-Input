import { CountryCode } from 'libphonenumber-js';

export type Region =
  | 'asia'
  | 'europe'
  | 'africa'
  | 'north-africa'
  | 'oceania'
  | 'america'
  | 'carribean'
  | 'south-america'
  | 'ex-ussr'
  | 'european-union'
  | 'middle-east'
  | 'central-america'
  | 'north-america';
export type IsoCode = CountryCode | 'INTL';

export interface ICountry {
  name: string;
  regions: Region[];
  iso2: IsoCode;
  dialCode: string;
  hasAreaCodes?: boolean;
  isAreaCode?: boolean;
}

export interface IPhoneNumberObj {
  phoneNumber: string;
  country: Omit<ICountry, 'hasAreaCodes' | 'isAreaCode' | 'dialCode' | 'regions'>;
}

export type PhoneNumber = string | IPhoneNumberObj;
export type Identifyer = 'name' | 'iso2' | 'dialCode';
export type NumberFormat = 'INTERNATIONAL' | 'NATIONAL';
export type DetectMobile = boolean | null | RegExpMatchArray;
export type FindCountryBy = (identifyer: Identifyer, item: IsoCode | string) => ICountry;
export type GetCountry = (phoneNumber: string) => ICountry | undefined;
export type GetPreferredCountries = (preferredCountries: IsoCode[]) => ICountry[];
export type GetInitialCountry = (defaultCountry?: IsoCode, preferredCountries?: IsoCode[], regions?: Region | Region[]) => ICountry;
export type GetCountryList = (preferredCountries?: IsoCode[], regions?: Region | Region[]) => ICountry[];
export type FormatNumber = (pohneNumber: string, format: NumberFormat, iso2: CountryCode) => string;
