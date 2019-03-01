import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import ReactCountryFlag from 'react-country-flag';
import { Countries } from '../../utils'

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
    defaultCountry: 'us',
    preferredCountries: [],
    excludeCountries: null,
    regions: null,
    placeholder: '+1 702 123 4567',
    disabled: false,
  }

  constructor(props) {
    super(props)
    const { defaultCountry, preferredCountries, regions } = props

    this.state = {
      selectedCountry: Countries.getInitial(defaultCountry, preferredCountries, regions),
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

  handleClick = code => () => {
    const selectedCountry = Countries.findBy('iso2', code)

    this.setState({
      selectedCountry,
      phoneNumber: `+${selectedCountry.dialCode}`,
      showCountries: false,
    })

    this.phoneInput.current.focus()
  }

  toggleList = () => {
    this.setState(prevState => ({
      showCountries: !prevState.showCountries
    }))
  }

  handleChange = e => {
    const { defaultCountry, preferredCountries, regions } = this.props
    const { value } = e.target
    let phoneNumber = value === '+' || value.startsWith('0') ? '' : `+${value.replace(/[^0-9.]+/g, '')}`

    let selectedCountry = Countries.guess(phoneNumber) || this.state.selectedCountry

    if (value === '+' || value.startsWith('0')) {
      phoneNumber = ''
      selectedCountry = Countries.getInitial(defaultCountry, preferredCountries, regions)
    }

    const { iso2, dialCode } = selectedCountry

    if (value.slice(dialCode.length).length > 4) {
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, `${iso2.toUpperCase()}`)
      phoneNumber = parsedPhoneNumber.formatInternational()
    }

    this.setState({
      selectedCountry,
      phoneNumber
    })
  }

  render() {
    const { selectedCountry, phoneNumber, showCountries } = this.state
    const { placeholder, disabled, preferredCountries, regions } = this.props

    return (
      <div className="phone-input">
        <button onClick={this.toggleList} disabled={disabled}>
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
        <input
          type="tel"
          value={phoneNumber}
          onChange={this.handleChange}
          ref={this.phoneInput}
          placeholder={placeholder}
          disabled={disabled}
          maxLength="20"
        />
        {
          showCountries && (
            <ul className="countryList">
              {
                Countries.getList(preferredCountries, regions).map((c, i)=> {
                  if (c.isAreaCode) { return null }
                  return (
                    <li
                      key={c.iso2}
                      onClick={this.handleClick(c.iso2)}
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
