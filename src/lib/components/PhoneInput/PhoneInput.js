import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import ReactCountryFlag from 'react-country-flag'
import useCountries from './useCountries'

import './styles.scss'

const [
  findBy,
  guess,
  getInitial,
  getList,
] = useCountries()

class PhoneInput extends Component {
  static propTypes = {
    defaultCountry: PropTypes.string,
    preferredCountries: PropTypes.arrayOf(PropTypes.string),
    regions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    defaultCountry: null,
    preferredCountries: [],
    regions: null,
    placeholder: '+1 702 123 4567',
    disabled: false,
  }

  constructor(props) {
    super(props)
    const { defaultCountry, preferredCountries, regions } = props

    this.state = {
      selectedCountry: getInitial(defaultCountry, preferredCountries, regions),
      phoneNumber: getInitial(defaultCountry, preferredCountries, regions).dialCode,
      showCountries: false,
    }

    this.phoneInput = createRef()
  }

  handleClick = code => () => {
    const selectedCountry = findBy('iso2', code)

    this.setState({
      selectedCountry,
      phoneNumber: selectedCountry.dialCode,
      showCountries: false,
    })

    this.phoneInput.current.focus()
  }

  toggleList = () => {
    this.setState(prevState => ({
      showCountries: !prevState.showCountries,
    }))
  }

  handleChange = e => {
    const { value } = e.target
    const { defaultCountry, preferredCountries, regions } = this.props
    const { selectedCountry: { iso2, dialCode } } = this.state

    let phoneNumber = value

    if (phoneNumber.slice(dialCode.length).length > 4) {
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, `${iso2.toUpperCase()}`)
      phoneNumber = parsedPhoneNumber.formatInternational()
    }

    if (!phoneNumber.length) {
      this.setState({
        selectedCountry: getInitial(defaultCountry, preferredCountries, regions),
        phoneNumber: '',
      })

      return
    }
    this.setState(prevState => ({
      selectedCountry: guess(value) || prevState.selectedCountry,
      phoneNumber,
    }))
  }

  handleClickOutside() {
    this.setState({
      showCountries: false,
    })
  }

  render() {
    const { selectedCountry, phoneNumber, showCountries } = this.state
    const {
      placeholder, disabled, preferredCountries, regions,
    } = this.props

    return (
      <div className="phone-input">
        <button onClick={this.toggleList} disabled={disabled} type="button">
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
                getList(preferredCountries, regions).map(c => {
                  if (c.isAreaCode) { return null }

                  return (
                    <li
                      key={c.iso2}
                      onClick={this.handleClick(c.iso2)}
                      onKeyPress={this.handleClick(c.iso2)}
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
