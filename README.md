<h1 align="center">React-PhoneNr-Input</h1>

<div align="center">

[![NPM](https://img.shields.io/npm/v/react-phonenr-input.svg)](https://www.npmjs.com/package/react-phonenr-input)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-phonenr-input)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-Airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/KaiHotz/react-formik-ui/blob/master/LICENSE)
![npm](https://img.shields.io/npm/dw/react-phonenr-input)


</div>

## Overview
React-PhoneNr-Input is a simple to use phone number input field with country selection, that by default, intuitively guesses the country for- and formats the entered phone number

For International phone numbers a dropdown menu is available to select ya country from.

By passing the prop `format='NATIONAL'` and a default country e.g. `defaultCountry='de'`  a simple input field is shown that formats the entered phone number with the national format declared by the `defaultCountry` prop.

All written with around 300 lines of code


### Demo and Examples [here](https://kaihotz.github.io/React-PhoneNr-Input/)


## Installation
npm:
```sh
npm i -S react-phonenr-input
```

yarn:
```sh
yarn add react-phonenr-input
```

#### Props:
<table style="font-size: 12px">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td>required</td>
    <td>The function/method that returns the entered Phone Nr.</td>
  </tr>
  <tr>
    <td>withCountryMeta</td>
    <td>boolean</td>
    <td>false</td>
    <td>
      changes the retuned value into an Object that contains the phone number and the country information.
      eg.:
      <pre>
        {
          phoneNumber: "+49 176 12345678",
          country: {
            name: "Germany (Deutschland)"
            iso2: "de"
          }
        }
      </pre>
    </td>
  </tr>
  <tr>
    <td>buttonFlagStyles</td>
    <td>object</td>
    <td>null</td>
    <td>Style object that overrides the styles of the Flag shown in the button</td>
  </tr>
  <tr>
    <td>className</td>
    <td>string</td>
    <td>null</td>
    <td>Adds a custom class to the Phone Nr. Input Field</td>
  </tr>
  <tr>
    <td>defaultCountry</td>
    <td>string</td>
    <td>null</td>
    <td>Sets the default country (use iso alpha-2 country code e.g 'us', 'gb', 'fr')</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>Disables the Phone Nr. Input Field</td>
  </tr>
  <tr>
    <td>format</td>
    <td>string</td>
    <td>'INTERNATIONAL'</td>
    <td>One of: 'INTERNATIONAL', 'NATIONAL'. Sets the format of the entered  phone number, in case of 'NATIONAL' the defaultCountry must be set</td>
  </tr>
  <tr>
    <td>initialValue</td>
    <td>string</td>
    <td>null</td>
    <td>Sets the initial Value of the Phone Number Input. This is usefull in case you need to set a phone number stored for example in a database</td>
  </tr>
  <tr>
    <td>listFlagStyles</td>
    <td>object</td>
    <td>null</td>
    <td>Style object that overrides the styles of the Flag shown in the country dropdown</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>string</td>
    <td>null</td>
    <td>Sets the Placeholder text</td>
  </tr>
  <tr>
    <td>preferredCountries</td>
    <td>Array</td>
    <td>null</td>
    <td>Lets you restrict the country dropdown to a specific list of countries (use iso alpha-2 country code e.g 'us', 'gb', 'fr')</td>
  </tr>
  <tr>
    <td>regions</td>
    <td>String / Array</td>
    <td>[]</td>
    <td>Lets you restrict the country dropdown to a list of countries in the specified regions</td>
  </tr>
</table>

###### In addition to the here listed Props you can pass all other properties that can be used on a normal Html input field

#### Code example:
```jsx
import React, { Component } from 'react'
import { PhoneInput } from 'react-phonenr-input';

class Example extends Component {

  handleChange = phoneNumber => {
    // Do something with the phoneNumber
  }

  render () {
    return (
      <div>
        <PhoneInput onChange={this.handleChange}/>
      </div>
    )
  }
}
```

#### Optimized for Mobile usage

<img src="https://raw.githubusercontent.com/KaiHotz/React-PhoneNr-Input/master/styleguide/mobile.png" width="200" alt="mobile">


## Support
If you like the project and want to support my work, you can buy me a coffee :)

[![paypal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/kaihotz)
