import { FocusEvent } from 'react';
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

export interface ICountry {
  name: string;
  regions: Region[];
  iso2: CountryCode;
  dialCode: string;
  hasAreaCodes?: boolean;
  isAreaCode?: boolean;
}

export interface IPhoneNumberObj {
  phoneNumber: string;
  country: Omit<ICountry, 'hasAreaCodes' | 'isAreaCode' | 'dialCode' | 'regions'> | null;
}

export type PhoneNumber = string | IPhoneNumberObj;

export interface IPhoneInputProps {
  /** The function that returns the  phonenumber or phonenumber object */
  onChange: (data: PhoneNumber) => void;
  /** Sets the format of the entered  phonenumber, in case of 'NATIONAL' the defaultCountry must be set */
  format?: NumberFormat;
  /** sets the maximum lenght of the phonenumber */
  maxLength?: number;
  /** Sets the Placeholder text */
  placeholder?: string;
  /** Disables the Phone Nr. Input Field */
  disabled?: boolean;
  /** Function that is called when entering the focus */
  onFocus?: (event: FocusEvent<unknown>) => void;
  /** Function that is called when leaving the focus */
  onBlur?: (event: FocusEvent<unknown>) => void;
  /**
   * changes the retuned value into an Object that contains the phonenumber and country meta information
   * eg.:
   {
     phoneNumber: "+49 176 12345678",
     country: {
       name: "Germany (Deutschland)"
       iso2: "DE"
      }
    }
  */
  withCountryMeta?: boolean;
  /** Sets the initial Value of the Phonenumber Input. This is usefull in case you need to set a phonenumber stored for example in a database */
  initialValue?: string;
  /** Sets the default country (use iso alpha-2 country code e.g 'US', 'GB', 'DE') */
  defaultCountry?: CountryCode;
  /** Lets you restrict the country dropdown to a specific list of countries (use iso alpha-2 country code e.g 'US', 'GB', 'DE') */
  preferredCountries?: CountryCode[];
  /** Lets you restrict the country dropdown to a list of countries in the specified regions */
  regions?: Region | Region[];
  /** Adds a custom class to the Phonenumber Input Field */
  className?: string;
}

export type NumberFormat = 'INTERNATIONAL' | 'NATIONAL';
export type DetectMobile = boolean | null | RegExpMatchArray;

export interface IPhoneNumberState {
  country?: ICountry;
  phoneNumber: string;
  showCountries: boolean;
}

export interface IUsePhoneInputProps {
  format: NumberFormat;
  initialCountry?: ICountry;
  initialValue?: string;
}
