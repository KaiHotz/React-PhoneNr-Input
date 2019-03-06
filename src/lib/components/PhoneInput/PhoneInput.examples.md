PhoneInput examples:

###### Default
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput onChange={handleChange}/>
```

###### With DefaultCountry
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  onChange={handleChange}
  defaultCountry='de'
/>
```


###### With PreferredCountries
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  onChange={handleChange}
  preferredCountries={['cl', 'ar', 'br', 'co']}
/>
```


###### With Regions
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  onChange={handleChange}
  regions={['carribean', 'oceania']}
/>
```

###### Format National
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  onChange={handleChange}
  format='NATIONAL'
  defaultCountry='us'
  placeholder='(555) 123-4567'
/>
```


