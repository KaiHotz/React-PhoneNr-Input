PhoneInput examples:

###### Default
```js
import { PhoneInput } from 'react-phone-picker';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput onChange={handleChange}/>
```

###### with defaultCountry
```js
import { PhoneInput } from 'react-phone-picker';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput onChange={handleChange} defaultCountry='de' />
```


###### with preferredCountries
```js
import { PhoneInput } from 'react-phone-picker';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput onChange={handleChange} preferredCountries={['cl', 'ar', 'br', 'co']} />
```


###### with regions
```js
import { PhoneInput } from 'react-phone-picker';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput onChange={handleChange} regions={['carribean', 'oceania']} />
```

###### Format National
```js
import { PhoneInput } from 'react-phone-picker';

const handleChange = phoneNumber => console.log(phoneNumber);

<PhoneInput onChange={handleChange} format='NATIONAL' defaultCountry='us' placeholder='(234) 567-8952' />
```


