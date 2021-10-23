import { renderHook, act } from '@testing-library/react-hooks';
import { usePhonenumber } from './usePhonenumber';
import { allCountries } from '../utils';

describe('usePhonenumber', () => {
  describe('INTERNATIONAL', () => {
    describe('default', () => {
      let hook;
      beforeEach(() => {
        hook = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL' }));
      });

      it('should have initial country undefined', () => {
        expect(hook.result.current.country).toBe(undefined);
      });

      it('should have no initial value', () => {
        expect(hook.result.current.phoneNumber).toBe('');
      });

      it('should set correct county and dial code onSelect', () => {
        act(() => hook.result.current.onSelect('DE'));
        expect(hook.result.current.country.iso2).toBe('DE');
        expect(hook.result.current.phoneNumber).toBe('+49');
      });
    });
    describe('With intial Country', () => {
      it('should have initial country', () => {
        const expected = allCountries[121];
        const { result } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL', initialCountry: expected }));

        expect(result.current.country).toBe(expected);
      });
    });

    describe('With intial value', () => {
      it('should have initial country', () => {
        const expected = '+49 176 1234112';
        const { result } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL', initialValue: expected }));

        expect(result.current.phoneNumber).toBe(expected);
      });
    });
  });
});
