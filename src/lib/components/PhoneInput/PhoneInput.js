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
    format: PropTypes.oneOf(['INTERNATIONAL', 'NATIONAL']),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    defaultCountry: null,
    preferredCountries: [],
    regions: null,
    format: 'INTERNATIONAL',
    placeholder: '+1 702 123 4567',
    disabled: false,
  }

  constructor(props) {
    super(props)
    const {
      defaultCountry, preferredCountries, regions, format,
    } = props

    this.state = {
      country: getInitial(defaultCountry, preferredCountries, regions),
      phoneNumber: format === 'INTERNATIONAL' ? getInitial(defaultCountry, preferredCountries, regions).dialCode : '',
      showCountries: false,
    }

    this.phoneInput = createRef()
  }

  handleClick = code => () => {
    const country = findBy('iso2', code)

    this.setState({
      country,
      phoneNumber: country.dialCode,
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
    const {
      defaultCountry, preferredCountries, regions, format,
    } = this.props
    const { country: { iso2, dialCode } } = this.state

    let phoneNumber = value

    if (!phoneNumber.length) {
      this.setState({
        country: getInitial(defaultCountry, preferredCountries, regions),
        phoneNumber: '',
      })

      return
    }

    if (!(/^[\d ()+-]+$/).test(value)) return

    if (phoneNumber.slice(dialCode.length).length > 4) {
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, iso2.toUpperCase())
      phoneNumber = parsedPhoneNumber.format(format)
    }

    this.setState(prevState => ({
      country: guess(value) || prevState.country,
      phoneNumber,
    }))
  }

  handleClickOutside() {
    this.setState({
      showCountries: false,
    })
  }

  render() {
    const { country, phoneNumber, showCountries } = this.state
    const {
      placeholder, disabled, preferredCountries, regions, format,
    } = this.props

    return (
      <div className="phone-input">
        {
          format === 'INTERNATIONAL' && (
            <button onClick={this.toggleList} disabled={disabled} type="button">
              <ReactCountryFlag
                code={country.iso2 || ''}
                styleProps={{
                  display: 'inline-block',
                  width: '13px',
                  backgroundPosition: 'top center',
                }}
                svg
              />
            </button>
          )
        }
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
          showCountries && format === 'INTERNATIONAL' && (
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
