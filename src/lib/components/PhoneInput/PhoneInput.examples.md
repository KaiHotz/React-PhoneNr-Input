
#### In addition to the here listed Props you can pass all other properties that can be used on a normal Html input field

##### Default example
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
initialState = { phoneNumber: '' };

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setState({ phoneNumber})
};

<Fragment>
  <p>Enter a Phone number to see the retuned value</p>

  <PhoneInput onChange={handleChange}/>

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {state.phoneNumber && JSON.stringify(state.phoneNumber, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Default example** _with phone number and country meta information as the return value_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
initialState = { phoneData: null };

const handleChange = phoneData => {
  /* Do something with the data eg.: setting state */
  setState({ phoneData })
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    withCountryMeta
    onChange={handleChange}
  />

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {state.phoneData && JSON.stringify(state.phoneData, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _with a default country_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
initialState = { phoneNumber: '' };

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setState({ phoneNumber})
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    onChange={handleChange}
    defaultCountry='de'
  />

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {state.phoneNumber && JSON.stringify(state.phoneNumber, null, 2)}
    </pre>
  </fieldset>

</Fragment>

```

###### **Example** _with preferred countries_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
initialState = { phoneNumber: '' };

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setState({ phoneNumber})
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    onChange={handleChange}
    preferredCountries={['cl', 'ar', 'br', 'co']}
  />

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {state.phoneNumber && JSON.stringify(state.phoneNumber, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _with regions_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
initialState = { phoneNumber: '' };

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setState({ phoneNumber})
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    onChange={handleChange}
    regions={['carribean', 'oceania']}
  />

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {state.phoneNumber && JSON.stringify(state.phoneNumber, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _for national phone number format_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
initialState = { phoneNumber: '' };

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setState({ phoneNumber})
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    onChange={handleChange}
    format='NATIONAL'
    defaultCountry='us'
    placeholder='(555) 123-4567'
  />

  <fieldset style={{maxWidth: 250, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {state.phoneNumber && JSON.stringify(state.phoneNumber, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _for national phone number format with phone number and country information as the return value_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
initialState = { phoneNumber: '' };

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setState({ phoneNumber})
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    withCountryMeta
    onChange={handleChange}
    format='NATIONAL'
    defaultCountry='us'
    placeholder='(555) 123-4567'
  />

  <fieldset style={{maxWidth: 250, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {state.phoneNumber && JSON.stringify(state.phoneNumber, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```




