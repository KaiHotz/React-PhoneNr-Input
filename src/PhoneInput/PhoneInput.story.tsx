import React, { useState } from 'react';
import { PhoneInput } from './PhoneInput';
import { PhoneNumber } from '../types';

export default {
  title: 'PhoneInput',
  component: PhoneInput,
};

export const Default = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>Enter a Phone number to see the retuned value</p>

      <PhoneInput onChange={handleChange} placeholder="+1 702 123 4567" />

      <fieldset style={{ maxWidth: 290, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};

export const WithIntialPhoneNumber = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>Enter a Phone number to see the retuned value</p>

      <PhoneInput onChange={handleChange} initialValue="+491761234112" />

      <fieldset style={{ maxWidth: 290, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};

export const WithPhoneNumberAndCountryMeta = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>
        <cite>Enter a Phone number to see the retuned value</cite>
      </p>

      <PhoneInput withCountryMeta onChange={handleChange} placeholder="+1 702 123 4567" />

      <fieldset style={{ maxWidth: 290, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};

export const WithDefaultCountry = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>
        <cite>Enter a Phone number to see the retuned value</cite>
      </p>

      <PhoneInput onChange={handleChange} defaultCountry="DE" />

      <fieldset style={{ maxWidth: 290, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};

export const WithPreferredCountries = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>
        <cite>Enter a Phone number to see the retuned value</cite>
      </p>

      <PhoneInput onChange={handleChange} preferredCountries={['CL', 'AR', 'BR', 'CO']} />

      <fieldset style={{ maxWidth: 290, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};

export const WithPreferredRegions = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>
        <cite>Enter a Phone number to see the retuned value</cite>
      </p>

      <PhoneInput onChange={handleChange} regions={['carribean', 'oceania']} />

      <fieldset style={{ maxWidth: 290, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};

export const NationalPhoneNumberFormat = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>
        <cite>Enter a Phone number to see the retuned value</cite>
      </p>

      <PhoneInput onChange={handleChange} format="NATIONAL" defaultCountry="US" placeholder="(555) 123-4567" />

      <fieldset style={{ maxWidth: 250, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};

export const NationalPhoneNumberFormatWithMeta = () => {
  const [value, setValue] = useState<PhoneNumber>('');

  const handleChange = (phoneNumber: PhoneNumber) => {
    /* Do something with the phoneNumber eg.: setting state */
    setValue(phoneNumber);
  };

  return (
    <>
      <p>
        <cite>Enter a Phone number to see the retuned value</cite>
      </p>

      <PhoneInput withCountryMeta onChange={handleChange} format="NATIONAL" defaultCountry="US" placeholder="(555) 123-4567" />

      <fieldset style={{ maxWidth: 250, minHeight: 32, marginTop: 20 }}>
        <legend>Preview of the returned Value:</legend>
        <pre style={{ margin: 0 }}>{value && JSON.stringify(value, null, 2)}</pre>
      </fieldset>
    </>
  );
};
