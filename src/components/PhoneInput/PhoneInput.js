import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import ReactCountryFlag from 'react-country-flag';
import { allCountries } from '../../utils'
import './styles.scss'

class PhoneInput extends Component {
  static propTypes = {
    defaultCountry: PropTypes.string,
    preferredCountries: PropTypes.arrayOf(PropTypes.string),
    regions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    defaultCountry: null,
    preferredCountries: null,
    excludeCountries: null,
    regions: null,
    placeholder: null,
    disabled: false,
  }

  constructor(props) {
    super(props)
    const { defaultCountry } = props

    this.state = {
      selectedCountry: defaultCountry ? allCountries.find(c => c.iso2 === defaultCountry) : {},
      phoneNumber: '',
      showCountries: false,
    }

    this.phoneInput = createRef()
  }

  handleClickOutside() {
    this.setState({
      showCountries: false,
    })
  }

  toggleList = () => {
    this.setState(prevState => ({
      showCountries: !prevState.showCountries
    }))
  }

  filterRegions = () => {
    const { regions } = this.props

    if (typeof regions === 'string') {
      return allCountries.filter(country => country.regions.includes(regions))
    }

    return allCountries.filter(country =>
      regions.map(region =>
        country.regions.includes(region)).some(el => el));
  }

  filterCountries = () => {
    const { preferredCountries } = this.props

    return preferredCountries.map(prefCountry => allCountries.find(country => country.iso2 === prefCountry))
  }


  getCountryList = () => {
    const { preferredCountries, regions } = this.props

    if (preferredCountries) return this.filterCountries()

    if (regions) return this.filterRegions()

    return allCountries
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
    let phoneNumber = value !== '+' ? `+${value.replace(/[^0-9.]+/g, '')}` : ''

    const selectedCountry = allCountries.find(c =>
      c.dialCode.startsWith(phoneNumber.substring(1, 20))) || this.state.selectedCountry

    const { iso2, dialCode } = selectedCountry

    if (value.lenght || (dialCode && value.slice(dialCode.length).length > 2)) {
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, `${iso2.toUpperCase()}`)
      phoneNumber = phoneNumber.length > 4 ? parsedPhoneNumber.formatInternational() : phoneNumber
    }

    this.setState({
      selectedCountry,
      phoneNumber
    })
  }

  render() {
    const { selectedCountry, phoneNumber, showCountries } = this.state

    const countries = this.getCountryList()

    return (
      <div className="phone-input">
        <button onClick={this.toggleList}>
          <ReactCountryFlag
            code={selectedCountry.iso2 || ''}
            styleProps={{
              display: 'inline-block',
              width: '13px',
              backgroundPosition: 'top center',
            }}
            svg
          />
        </button>
        <input type="tel" value={phoneNumber} onChange={this.handleChange} ref={this.phoneInput} maxLength="20"/>
        {
          showCountries && (
            <ul onClick={this.handleSelect} className="countryList">
              {
                countries.map((c, i)=> {
                  if (c.isAreaCode) { return null }
                  return (
                    <li
                      key={c.iso2}
                      onClick={this.handleCountrySelect(c.iso2)}
                    >
                      <ReactCountryFlag
                        styleProps={{
                          width: '13px',
                          height: '10px',
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

export default enhanceWithClickOutside(PhoneInput)
