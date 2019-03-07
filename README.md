<h1 align="center">React-PhoneNr-Input</h1>

<div align="center">

[![NPM](https://img.shields.io/npm/v/react-phonenr-input.svg)](https://www.npmjs.com/package/react-phonenr-input)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-Airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/KaiHotz/react-formik-ui/blob/master/LICENSE)

</div>

## Overview
React-PhoneNr-Input is a simple to use phone number input field with country selection, that by default, intuitively guesses the country for- and formats the entered phone number

By passing the prop `format='NATIONAL'` and a default country e.g. `defaultCountry='de'`  a simple input field is shown that formats the entered phone number with the national format used by the default country specified.


### Demo [here](https://kaihotz.github.io/React-PhoneNr-Input/)


## Installation
npm:
```sh
npm install --save react-phonenr-input
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
    <td>className</td>
    <td>string</td>
    <td>null</td>
    <td>Adds a custom class to the form</td>
  </tr>
  <tr>
    <td>structured</td>
    <td>boolean</td>
    <td>false</td>
    <td>If passed adds a minimal style that gives some structure to the Form</td>
  </tr>
    <tr>
    <td>themed</td>
    <td>boolean</td>
    <td>false</td>
    <td>If passed the React-Formik-UI theme will be applied to each styled Form element</td>
  </tr>

</table>










