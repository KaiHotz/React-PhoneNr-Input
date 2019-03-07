PhoneInput examples:

###### Default
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput name='phoneInput' onChange={handleChange}/>
```

###### With Default Country
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  name='phoneInput'
  onChange={handleChange}
  defaultCountry='de'
/>
```


###### With Preferred Countries
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  name='phoneInput'
  onChange={handleChange}
  preferredCountries={['cl', 'ar', 'br', 'co']}
/>
```


###### With Regions
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  name='phoneInput'
  onChange={handleChange}
  regions={['carribean', 'oceania']}
/>
```

###### Format National
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  name='phoneInput'
  onChange={handleChange}
  format='NATIONAL'
  defaultCountry='us'
  placeholder='(555) 123-4567'
/>
```


