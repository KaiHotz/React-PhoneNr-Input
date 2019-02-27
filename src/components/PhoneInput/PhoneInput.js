import React, { Component, createRef } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { allCountries } from '../../utils'

class PhoneInput extends Component {
  state = {
    selectedCountry: {},
    phoneNumber: ''
  }

  phoneInput = createRef()

  handleSelect = e => {
    const selectedCountry = allCountries.find(c => c.iso2 === e.target.value)

    this.setState({
      selectedCountry,
      phoneNumber: selectedCountry.dialCode,
    })

    this.phoneInput.current.focus()
  }

  handleChange = e => {
    const { value } = e.target
    let phoneNumber = `+${value.replace(/[^0-9.]+/g, '')}` || ''
    const country = allCountries.find(c => c.dialCode.startsWith(value.substring(0, 5)))
    const { iso2, dialCode } = country || this.state.selectedCountry

    if (value.lenght || (dialCode && value.slice(dialCode.length).length > 2)) {
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, `${iso2.toUpperCase()}`)
      phoneNumber = phoneNumber.length > 4 ? parsedPhoneNumber.formatInternational() : phoneNumber
    }

    this.setState(prevState => ({
      selectedCountry: country || prevState.selectedCountry,
      phoneNumber
    }))
  }

  render() {
    const { selectedCountry, phoneNumber } = this.state
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
        <input type="tel" value={phoneNumber} onChange={this.handleChange} ref={this.phoneInput} maxLength="20"/>
      </div>
    )
  }
}

export default PhoneInput
