import React, { Component } from 'react'
import { allCountries, allCountryCodes } from '../../utils'

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
    this.setState({
      phoneNumber: e.target.value,
    })
  }

  render() {
    const { selectedCountry, phoneNumber } = this.state;
    return (
      <div>
        <select onChange={this.handleSelect} value={selectedCountry}>
          {
            allCountries.map(country => {
              if (country.isAreaCode) { return null }
              return (
                <option key={country.iso2} value={country.iso2}>{country.iso2}</option>
              )
            })
          }
        </select>
        <input type='text' value={phoneNumber} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default PhoneInput
