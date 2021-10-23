import { useEffect, useReducer } from 'react';
import { produce } from 'immer';
import { CountryCode, findPhoneNumbersInText } from 'libphonenumber-js';
import { IPhoneNumberState, IUsePhoneInputProps } from '../types';
import { formatNumber, getCountry, findCountryByCode } from '../utils/countries-fn';

export const initialState: IPhoneNumberState = {
  country: undefined,
  phoneNumber: '',
  showCountries: false,
};

interface IOnChange {
  type: 'onChange';
  payload: Partial<IPhoneNumberState>;
}

interface ISetShowCountries {
  type: 'setShowCountries';
  payload: boolean;
}

const phoneInputReducer = (state: IPhoneNumberState, action: IOnChange | ISetShowCountries) => {
  switch (action.type) {
    case 'onChange':
      state = { ...state, ...action.payload };

      return state;

    case 'setShowCountries':
      state.showCountries = action.payload;

      return state;

    default:
      return state;
  }
};

export const usePhoneInput = ({ initialValue, initialCountry, format }: IUsePhoneInputProps) => {
  const reducer = produce(phoneInputReducer);
  const [state, dispatch] = useReducer(reducer, initialState);
  const isInternational = format === 'INTERNATIONAL';

  useEffect(() => {
    let payload = {
      country: initialCountry,
      phoneNumber: isInternational && initialCountry ? initialCountry.dialCode : '',
    };

    if (initialValue) {
      const metaData = findPhoneNumbersInText(initialValue);
      const selectedCountry = findCountryByCode(metaData[0].number.country);
      const formated = selectedCountry ? formatNumber(initialValue, format, selectedCountry.iso2) : initialValue;

      payload = {
        country: selectedCountry,
        phoneNumber: formated.length > 0 ? formated : initialValue,
      };
    }

    dispatch({
      type: 'onChange',
      payload,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (countryCode: CountryCode) => {
    const selectedCountry = findCountryByCode(countryCode);

    dispatch({
      type: 'onChange',
      payload: {
        country: selectedCountry,
        phoneNumber: selectedCountry?.dialCode || '',
        showCountries: false,
      },
    });
  };

  const onInputChange = (value: string) => {
    const formated = state.country ? formatNumber(value, format, state.country.iso2) : '';
    const selectedCountry = getCountry(formated.length > 0 ? formated : value);

    dispatch({
      type: 'onChange',
      payload: {
        country: isInternational && selectedCountry ? selectedCountry : state.country,
        phoneNumber: formated.length > 0 ? formated : value,
      },
    });
  };

  const resetState = () => {
    dispatch({
      type: 'onChange',
      payload: isInternational ? initialState : { phoneNumber: '' },
    });
  };

  const setShowCountries = (show: boolean) => {
    dispatch({
      type: 'setShowCountries',
      payload: show,
    });
  };

  return {
    country: state.country,
    phoneNumber: state.phoneNumber,
    showCountries: state.showCountries,
    onSelect,
    onInputChange,
    setShowCountries,
    resetState,
  };
};
