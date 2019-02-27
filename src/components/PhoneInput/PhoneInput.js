import React, { Component, createRef } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import ReactCountryFlag from 'react-country-flag';
import { allCountries } from '../../utils'
import './styles.scss'

class PhoneInput extends Component {
  state = {
    selectedCountry: {},
    phoneNumber: '',
    showCountries: false,
  }

  phoneInput = createRef()

  toggleList = () => {
    this.setState(prevState => ({
      showCountries: !prevState.showCountries
    }))
  }

  handleCountrySelect = code => () => {
    const selectedCountry = allCountries.find(c => c.iso2 === code)

    this.setState({
      selectedCountry,
      phoneNumber: selectedCountry.dialCode,
      showCountries: false,
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
    const { selectedCountry, phoneNumber, showCountries } = this.state
    return (
      <div className="phone-input">
        <button onClick={this.toggleList}>
          <div className="flag-wrapper">
            <ReactCountryFlag
              code={selectedCountry.iso2 || 'de'}
              styleProps={{
                display: 'inline-block',
                width: '13px',
                backgroundPosition: 'top center',
              }}
              svg
            />

          </div>
        </button>
        <input type="tel" value={phoneNumber} onChange={this.handleChange} ref={this.phoneInput} maxLength="20"/>
        {
          showCountries && (
            <ul onClick={this.handleSelect} className="countryList">
              {
                allCountries.map((c, i)=> {
                  if (c.isAreaCode) { return null }
                  return (
                    <li
                      key={c.iso2}
                      onClick={this.handleCountrySelect(c.iso2)}
                    >
                      <ReactCountryFlag
                        styleProps={{
                          width: '13px',
                        }}
                        code={c.iso2}
                        svg
                      />
                      {` - ${c.name}`}
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    )
  }
}

export default PhoneInput
