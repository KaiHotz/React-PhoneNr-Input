
#### In addition to the here listed Props you can pass all other properties that can be used on a normal Html input field

##### **Default example**
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';

const [value, setValue] = React.useState('')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
};

<Fragment>
  <p>Enter a Phone number to see the retuned value</p>

  <PhoneInput onChange={handleChange}/>

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

##### **Default example** with an intial phone number set
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
const [value, setValue] = React.useState('+491761234112')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
};

<Fragment>
  <p>Enter a Phone number to see the retuned value</p>

  <PhoneInput
    onChange={handleChange}
    initialValue={value}
  />

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```


###### **Default example** _with phone number and country meta information as the return value_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
const [value, setValue] = React.useState('')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
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
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _with a default country_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
const [value, setValue] = React.useState('')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    onChange={handleChange}
    defaultCountry='DE'
  />

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>

```

###### **Example** _with preferred countries_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
const [value, setValue] = React.useState('')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
};
<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    onChange={handleChange}
    preferredCountries={['CL', 'AR', 'BR', 'CO']}
  />

  <fieldset style={{maxWidth: 290, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _with regions_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
const [value, setValue] = React.useState('')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
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
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _for national phone number format_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
const [value, setValue] = React.useState('')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    onChange={handleChange}
    format='NATIONAL'
    defaultCountry='US'
    placeholder='(555) 123-4567'
  />

  <fieldset style={{maxWidth: 250, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```

###### **Example** _for national phone number format with phone number and country information as the return value_
```jsx
import { Fragment } from 'react';
import { PhoneInput } from 'react-phonenr-input';
const [value, setValue] = React.useState('')

const handleChange = phoneNumber => {
  /* Do something with the phoneNumber eg.: setting state */
  setValue(phoneNumber)
};

<Fragment>
  <p><cite>Enter a Phone number to see the retuned value</cite></p>

  <PhoneInput
    withCountryMeta
    onChange={handleChange}
    format='NATIONAL'
    defaultCountry='US'
    placeholder='(555) 123-4567'
  />

  <fieldset style={{maxWidth: 250, minHeight: 32, marginTop: 20}}>
    <legend>Preview of the returned Value:</legend>
    <pre style={{margin: 0}}>
      {value && JSON.stringify(value, null, 2)}
    </pre>
  </fieldset>

</Fragment>
```




