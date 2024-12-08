import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { usePhonenumber } from './usePhonenumber';
import { allCountries } from '../utils';

describe('usePhonenumber', () => {
  describe('INTERNATIONAL', () => {
    describe('default', () => {
      it('should have initial country undefined', () => {
        const { result } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL' }));

        expect(result.current.country).toBe(undefined);
      });

      it('should have no initial value', () => {
        const { result } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL' }));

        expect(result.current.phoneNumber).toBe('');
      });

      it('should set correct county and dial code onSelect', () => {
        const { result } = renderHook(() => usePhonenumber({ format: 'INTERNATIONAL' }));

        act(() => result.current.onSelect('DE'));
        expect(result.current.country?.iso2).toBe('DE');
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
