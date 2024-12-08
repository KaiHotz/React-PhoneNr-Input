import { describe, expect, it } from 'vitest';
import { CountryCode } from 'libphonenumber-js';

import { findCountryByCode, getCountryByDialCode, getInitialCountry } from './countries-fn';
import { allCountries } from './allCountries';

describe('findCountryByCode', () => {
  describe('when passed iso2 as identifier', () => {
    it('should return corresponding country', () => {
      expect(findCountryByCode('DE')).toEqual(allCountries[121]);
    });
  });

  describe('when no code is provided', () => {
    it('should return undefined', () => {
      expect(findCountryByCode()).toBe(undefined);
    });
  });

  describe('when no match is found', () => {
    it('should return undefined', () => {
      expect(findCountryByCode('notFound' as CountryCode)).toBe(undefined);
    });
  });
});

describe('getCountry', () => {
  describe('when passed phonenumber starting with +00', () => {
    it('should return corresponding country', () => {
      expect(getCountryByDialCode('+0049')).toEqual(allCountries[121]);
    });
  });

  describe('when passed phonenumber starting with +', () => {
    it('should return corresponding country', () => {
      expect(getCountryByDialCode('+49')).toEqual(allCountries[121]);
    });
  });

  describe('when passed phonenumber starting with 00', () => {
    it('should return corresponding country', () => {
      expect(getCountryByDialCode('0049')).toEqual(allCountries[121]);
    });
  });

  describe('when passed phonenumber starting with 49', () => {
    it('should return corresponding country', () => {
      expect(getCountryByDialCode('49')).toEqual(allCountries[121]);
    });
  });
});

describe('getInitialCountry', () => {
  describe('when no data is provided', () => {
    it('should return undefined', () => {
      expect(getInitialCountry()).toBe(undefined);
    });
  });

  describe('when default country is provided', () => {
    it('should return undefined', () => {
      expect(getInitialCountry('DE')).toEqual(allCountries[121]);
    });
  });

  describe('when preferred country list is provided', () => {
    it('should return undefined', () => {
      expect(getInitialCountry(undefined, ['DE', 'CL', 'AR'])).toEqual(allCountries[121]);
    });
  });
});
