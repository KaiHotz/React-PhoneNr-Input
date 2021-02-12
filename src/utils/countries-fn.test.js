import { findCountryBy, getCountry } from './countries-fn';
import { allCountries } from './allCountries';

describe('findCountryBy', () => {
  describe('when passed name as identifier', () => {
    it('should return corresponding country', () => {
      expect(findCountryBy('name', 'Germany')).toBe(allCountries[122]);
    });
  });

  describe('when passed iso2 as identifier', () => {
    it('should return corresponding country', () => {
      expect(findCountryBy('iso2', 'DE')).toBe(allCountries[122]);
    });
  });

  describe('when passed dialCode as identifier', () => {
    it('should return corresponding country', () => {
      expect(findCountryBy('dialCode', '+49')).toBe(allCountries[122]);
    });
  });

  describe('when no match is found', () => {
    it('should return inital country', () => {
      expect(findCountryBy('name', 'notFound')).toBe(allCountries[0]);
    });
  });
});

describe('getCountry', () => {
  describe('when passed phonenumber starting with +00', () => {
    it('should return corresponding country', () => {
      expect(getCountry('+0049')).toBe(allCountries[122]);
    });
  });

  describe('when passed phonenumber starting with +', () => {
    it('should return corresponding country', () => {
      expect(getCountry('+49')).toBe(allCountries[122]);
    });
  });

  describe('when passed phonenumber starting with 00', () => {
    it('should return corresponding country', () => {
      expect(getCountry('0049')).toBe(allCountries[122]);
    });
  });

  describe('when passed phonenumber starting with 49', () => {
    it('should return corresponding country', () => {
      expect(getCountry('49')).toBe(allCountries[122]);
    });
  });
});
