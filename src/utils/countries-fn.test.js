import { findCountryByCode, getCountry, getInitialCountry } from './countries-fn';
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
      expect(findCountryByCode('notFound')).toBe(undefined);
    });
  });
});

describe('getCountry', () => {
  describe('when passed phonenumber starting with +00', () => {
    it('should return corresponding country', () => {
      expect(getCountry('+0049')).toEqual(allCountries[121]);
    });
  });

  describe('when passed phonenumber starting with +', () => {
    it('should return corresponding country', () => {
      expect(getCountry('+49')).toEqual(allCountries[121]);
    });
  });

  describe('when passed phonenumber starting with 00', () => {
    it('should return corresponding country', () => {
      expect(getCountry('0049')).toEqual(allCountries[121]);
    });
  });

  describe('when passed phonenumber starting with 49', () => {
    it('should return corresponding country', () => {
      expect(getCountry('49')).toEqual(allCountries[121]);
    });
  });
});

describe('getInitialCountry', () => {
  describe('when no datat is provided', () => {
    it('should return undefined', () => {
      expect(getInitialCountry()).toBe(undefined);
    });
  });
});
