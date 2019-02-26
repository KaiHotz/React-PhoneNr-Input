import React, { Component } from 'react'
import ReactCountryFlag from "react-country-flag";
import { allCountries } from '../../utils'

class PhoneInput extends Component {
  state = {
    selectedCountry: '',
    phoneNumber: ''
  }

  handleSelect = e => {
    const selectedCountry = allCountries.find(country => country.iso2 === e.target.value)

    this.setState({
      selectedCountry,
      phoneNumber: selectedCountry.dialCode,
    })
  }

  handleChange = e => {
    const { value } = e.target
    const selectedCountry = allCountries.find(country => country.dialCode.startsWith(value.substring(0, 4)))
    const phoneNumber = value.replace(/[^0-9.]+/g, '') || ''

    if (selectedCountry) {
      this.setState({
        selectedCountry,
        phoneNumber
      })
    }

    this.setState({
      phoneNumber
    })
  }

  render() {
    const { selectedCountry, phoneNumber } = this.state;
    return (
      <div>
        <select onChange={this.handleSelect} value={selectedCountry.iso2} style={{maxWidth: '50px'}}>
          {
            allCountries.map(country => {
              if (country.isAreaCode) { return null }
              return (
                <option key={country.iso2} value={country.iso2}>
                  {country.name}
                </option>
              )
            })
          }
        </select>
        <input type="tel" value={phoneNumber} onChange={this.handleChange} />
        <ReactCountryFlag
          styleProps={{
            width: '20px',
            height: '20px'
          }}
          code={selectedCountry.iso2 || 'de'}
        />
      </div>
    )
  }
}

export default PhoneInput
