import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import cx from 'classnames'
import ReactCountryFlag from 'react-country-flag'
import omit from 'lodash.omit'
import { detectMobile } from '../../utils/detectMobile'
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
    /** Sets the default country (use iso alpha-2 country code e.g 'us', 'gb', 'fr') */
    defaultCountry: PropTypes.string,
    /** Lets you restrict the country dropdown to a specific list of countries (use iso alpha-2 country code e.g 'us', 'gb', 'fr') */
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
    /** Adds a custom class to the Phone Nr. Input Field */
    className: PropTypes.string,
    /** Disables the Phone Nr. Input Field */
    disabled: PropTypes.bool,
    /** The function/method that returns the entered Phone Nr. */
    onChange: PropTypes.func.isRequired,
    /**
     * changes the retuned value into an Object that contains the phone number and country meta information
     * eg.:
      {
        phoneNumber: "+49 176 12345678",
        country: {
          name: "Germany (Deutschland)"
          iso2: "de"
        }
      }
    */
    withCountryMeta: PropTypes.bool,
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
    withCountryMeta: false,
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
    this.countryList = createRef()
    this.activeCountry = createRef()
  }

  handleReturnValue = () => {
    const { withCountryMeta, onChange } = this.props
    const { phoneNumber, country } = this.state
    const data = withCountryMeta
      ? { phoneNumber, country: omit(country, ['hasAreaCodes', 'isAreaCode', 'dialCode', 'regions']) }
      : phoneNumber

    onChange(data)
  }

  handleSelect = code => e => {
    const country = findCountryBy('iso2', code || e.target.value)

    this.setState({
      country,
      phoneNumber: country.dialCode,
      showCountries: false,
    }, () => this.handleReturnValue())

    this.phoneInput.current.focus()
  }

  scrollToCountry = () => {
    const { showCountries, country: { iso2 } } = this.state
    if (showCountries && iso2 !== 'intl') {
      this.countryList.current.scrollTop = (this.activeCountry.current?.offsetTop - 50)
    }
  }

  toggleList = () => {
    const { disabled } = this.props

    if (!disabled) {
      this.setState(prevState => ({
        showCountries: !prevState.showCountries,
      }), () => this.scrollToCountry())
    }
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
      defaultCountry, preferredCountries, regions, format,
    } = this.props

    if (!value.length) {
      this.setState({
        country: getInitialCountry(defaultCountry, preferredCountries, regions),
        phoneNumber: '',
      }, () => this.handleReturnValue())

      return
    }

    if (!(/^[\d ()+-]+$/).test(value)) return

    this.setState(prevState => ({
      country: (format === 'INTERNATIONAL' && getCountry(value)) || prevState.country,
      phoneNumber: this.formatNumber(value),
    }), () => {
      this.scrollToCountry()
      this.handleReturnValue()
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
      'format',
      'regions',
      'defaultCountry',
      'preferredCountries',
      'buttonFlagStyles',
      'listFlagStyles',
      'withCountryMeta',
    ])
    const isMobile = detectMobile.any()
    const toggleList = !isMobile ? this.toggleList : undefined

    return (
      <div className="react-phonenr-input">
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
                    className={className}
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
          className={className}
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
            <ul className="country-list" ref={this.countryList}>
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
                      ref={c.iso2 === iso2 ? this.activeCountry : null}
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
