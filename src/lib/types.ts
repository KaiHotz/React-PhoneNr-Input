import { CountryCode } from 'libphonenumber-js'

export type IsoCode = CountryCode | 'INTL'
export interface ICountry {
  name: string;
  regions: string[];
  iso2: CountryCode | 'INTL',
  dialCode: string,
  hasAreaCodes?: boolean,
  isAreaCode?: boolean,
}

export type Identifyer = 'name' | 'iso2' | 'dialCode'
export type NumberFormat = 'INTERNATIONAL' | 'NATIONAL'
export type DetectMobile = boolean | null | RegExpMatchArray
export interface IReturnValueObj {
  phoneNumber: string;
  country: Omit<ICountry, 'hasAreaCodes' | 'isAreaCode' | 'dialCode' | 'regions'>
}

export type FindCountryBy = (identifyer: Identifyer, item: IsoCode | string) => ICountry
export type GetCountry = (phoneNumber: string) => ICountry | undefined
export type GetPreferredCountries = (preferredCountries: string[]) => ICountry[]
export type GetInitialCountry = (defaultCountry?: string, preferredCountries?: string[], regions?: string | string[]) => ICountry
export type GetCountryList = (preferredCountries?: string[], regions?: string | string[]) => ICountry[]
export type FormatNumber = (pohneNumber: string, format: NumberFormat, iso2: CountryCode) => string
