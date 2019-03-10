import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import cx from 'classnames'
import ReactCountryFlag from 'react-country-flag'
import omit from 'lodash.omit'
import { detectMobile, hasWindowObj } from '../../utils/detectMobile'
import globe from './globe.png'

import {
  findCountryBy,
  getCountry,
  getInitialCountry,
  getCountryList,
} from '../../utils/countries-fn'

import './styles.scss'

export class PhoneInput extends Component {
  static propTypes = {
    /** Sets the default country */
    defaultCountry: PropTypes.string,
    /** Lets you restrict the country dropdown to a specific list of countries */
    preferredCountries: PropTypes.arrayOf(PropTypes.string),
    /** Lets you restrict the country dropdown to a list of countries in the specified regions */
    regions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    /** Sets the format of the entered  phone number, in case of 'NATIONAL' the defaultCountry must be set */
    format: PropTypes.oneOf(['INTERNATIONAL', 'NATIONAL']),
    /** Sets the Placeholder text */
    placeholder: PropTypes.string,
    /** Adds a custom class to the Phone Nr. Input Field wrapper div */
    className: PropTypes.string,
    /** Disables the Phone Nr. Input Field */
    disabled: PropTypes.bool,
    /** The function/method that returns the entered Phone Nr. */
    onChange: PropTypes.func.isRequired,
    /** Style object that overrides the styles of the Flag shown in the button */
    buttonFlagStyles: PropTypes.instanceOf(Object),
    /** Style object that overrides the styles of the Flag shown in the country dropdown */
    listFlagStyles: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    defaultCountry: null,
    preferredCountries: [],
    regions: null,
    format: 'INTERNATIONAL',
    placeholder: '+1 702 123 4567',
    className: null,
    disabled: false,
    buttonFlagStyles: null,
    listFlagStyles: null,
  }

  constructor(props) {
    super(props)
    const {
      defaultCountry, preferredCountries, regions, format,
    } = props

    this.state = {
      country: getInitialCountry(defaultCountry, preferredCountries, regions),
      phoneNumber: format === 'INTERNATIONAL' ? getInitialCountry(defaultCountry, preferredCountries, regions).dialCode : '',
      showCountries: false,
    }

    this.phoneInput = createRef()
  }

  handleSelect = code => e => {
    const country = findCountryBy('iso2', code || e.target.value)

    this.setState({
      country,
      phoneNumber: country.dialCode,
      showCountries: false,
    }, () => this.props.onChange(this.state.phoneNumber))

    this.phoneInput.current.focus()
  }

  scrollToCountry = () => {
    const { showCountries } = this.state
    if (hasWindowObj && showCountries) {
      const activeCountry = document.querySelector('.active-country')
      if (activeCountry) {
        activeCountry.scrollIntoView()
      }
    }
  }

  toggleList = () => {
    this.setState(prevState => ({
      showCountries: !prevState.showCountries,
    }), () => this.scrollToCountry())
  }

  formatNumber = number => {
    const { format } = this.props
    const { country: { iso2 } } = this.state

    let phoneNumber = number

    if (format === 'INTERNATIONAL') {
      if (!phoneNumber.startsWith('+')) {
        phoneNumber = `+${phoneNumber}`
      }
      if (phoneNumber.startsWith('+00')) {
        phoneNumber = phoneNumber.replace('00', '')
      }
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, iso2.toUpperCase())

    try {
      phoneNumber = parsedPhoneNumber.format(format)
    } catch (e) {
      phoneNumber = phoneNumber.replace(/\(+-()\)/g, '')
    }

    return phoneNumber
  }

  handleChange = e => {
    const { value } = e.target
    const {
      defaultCountry, preferredCountries, regions, format, onChange,
    } = this.props

    if (!value.length) {
      this.setState({
        country: getInitialCountry(defaultCountry, preferredCountries, regions),
        phoneNumber: '',
      }, () => onChange(this.state.phoneNumber))

      return
    }

    if (!(/^[\d ()+-]+$/).test(value)) return

    this.setState(prevState => ({
      country: (format === 'INTERNATIONAL' && getCountry(value)) || prevState.country,
      phoneNumber: this.formatNumber(value),
    }), () => {
      this.scrollToCountry()
      onChange(this.state.phoneNumber)
    })
  }

  handleFlag = iso2 => (
    iso2 === 'intl'
      ? <img src={globe} alt="globe" />
      : (
        <ReactCountryFlag
          code={iso2 || ''}
          styleProps={{
            display: 'block',
            position: 'absolute',
            width: '20px',
            height: '15px',
            backgroundPosition: 'center center',
            zIndex: 7,
            ...this.props.buttonFlagStyles,
          }}
          svg
        />
      )
  )

  handleClickOutside() {
    this.setState({
      showCountries: false,
    })
  }

  render() {
    const { country: { iso2 }, phoneNumber, showCountries } = this.state
    const {
      placeholder, disabled, preferredCountries, regions, format, className, listFlagStyles,
    } = this.props
    const passableProps = omit(this.props, [
      'className',
      'format',
      'regions',
      'defaultCountry',
      'preferredCountries',
      'buttonFlagStyles',
      'listFlagStyles',
    ])
    const isMobile = detectMobile.any()
    const toggleList = !isMobile ? this.toggleList : undefined

    return (
      <div className={`react-phonenr-input ${className}`}>
        {
          format === 'INTERNATIONAL' && (
            <div
              onClick={toggleList}
              className="flag-wrapper"
              role="none"
            >
              {this.handleFlag(iso2)}
              {
                isMobile && (
                  <select
                    onChange={this.handleSelect()}
                    disabled={disabled}
                  >
                    {
                      getCountryList(preferredCountries, regions).map(c => {
                        if (c.isAreaCode) {
                          return null
                        }

                        return (
                          <option key={c.iso2} value={c.iso2}>
                            {c.name}
                          </option>
                        )
                      })
                    }
                  </select>
                )
              }
            </div>
          )
        }
        <input
          {...passableProps}
          type="tel"
          value={phoneNumber}
          onChange={this.handleChange}
          placeholder={placeholder}
          disabled={disabled}
          ref={this.phoneInput}
          maxLength="21"
        />
        {
          showCountries && format === 'INTERNATIONAL' && !isMobile && (
            <ul className="country-list">
              {
                getCountryList(preferredCountries, regions).map(c => {
                  if (c.isAreaCode) {
                    return null
                  }

                  return (
                    <li
                      key={c.iso2}
                      onClick={this.handleSelect(c.iso2)}
                      onKeyPress={this.handleSelect(c.iso2)}
                      className={cx('country-list-item', { 'active-country': c.iso2 === iso2 })}
                    >
                      <ReactCountryFlag
                        styleProps={{
                          width: '20px',
                          ...listFlagStyles,
                        }}
                        code={c.iso2}
                        svg
                      />
                      {` ${c.name}`}
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
