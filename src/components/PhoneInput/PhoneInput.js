import React, { Component, createRef } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { allCountries } from '../../utils'

class PhoneInput extends Component {
  state = {
    selectedCountry: {},
    phoneNumber: ''
  }

  phoneInput = createRef();

  handleSelect = e => {
    const selectedCountry = allCountries.find(country => country.iso2 === e.target.value)

    this.setState({
      selectedCountry,
      phoneNumber: selectedCountry.dialCode,
    })

    this.phoneInput.current.focus()
  }

  handleChange = e => {
    const { value } = e.target
    const selectedCountry = allCountries.find(country => country.dialCode.startsWith(value.substring(0, 5)))
    let phoneNumber = `+${value.replace(/[^0-9.]+/g, '')}` || ''

    if(value.length) {
      const { iso2 } = selectedCountry || this.state.selectedCountry
      const parsedPhoneNumber = iso2 ? parsePhoneNumberFromString(phoneNumber, `${iso2.toUpperCase()}`) : phoneNumber
      phoneNumber = phoneNumber.length > 4 ? parsedPhoneNumber.formatInternational() : phoneNumber
    }

    if (selectedCountry) {
      this.setState({
        selectedCountry,
        phoneNumber,
      })
    }

    this.setState({
      phoneNumber,
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
                  {`${country.iso2} - ${country.name}`}
                </option>
              )
            })
          }
        </select>
        <input type="tel" value={phoneNumber} onChange={this.handleChange} ref={this.phoneInput}/>
      </div>
    )
  }
}

export default PhoneInput
