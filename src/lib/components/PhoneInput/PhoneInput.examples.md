
#### In addition to the here listed Props you can pass all other properties that can be used on a normal Html input field

###### Default
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput onChange={handleChange}/>
```

###### With Default Country
```js
import { PhoneInput } from 'react-phonenr-input';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput
  onChange={handleChange}
  defaultCountry='de'
/>
```


###### With Preferred Countries
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


