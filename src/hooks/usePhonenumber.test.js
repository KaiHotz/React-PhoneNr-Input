import { renderHook, act } from '@testing-library/react-hooks';
import { usePhonenumber } from './usePhonenumber';
import { allCountries } from '../utils';

describe('usePhonenumber', () => {
  describe('INTERNATIONAL', () => {
    describe('default', () => {
      it('should have initial country undefined', async () => {
        const { result, waitFor } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL' }));
        await waitFor(() => result.current);
        expect(result.current.country).toBe(undefined);
      });

      it('should have no initial value', async () => {
        const { result, waitFor } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL' }));
        await waitFor(() => result.current);
        expect(result.current.phoneNumber).toBe('');
      });

      it('should set correct county and dial code onSelect', async () => {
        const { result, waitFor } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL' }));
        await waitFor(() => result.current);
        act(() => result.current.onSelect('DE'));
        expect(result.current.country.iso2).toBe('DE');
        expect(result.current.phoneNumber).toBe('+49');
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
