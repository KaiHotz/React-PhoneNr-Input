import React, {
  useRef, useState, useEffect, memo, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import ReactCountryFlag from 'react-country-flag'
import omit from 'lodash.omit'
import { detectMobile } from '../../utils/detectMobile'
import globe from './globe.png'
import {
  findCountryBy,
  formatNumber,
  getCountry,
  getInitialCountry,
  getCountryList,
} from '../../utils/countries-fn'

import './styles.scss'

export const PhoneInput = ({
  className,
  defaultCountry,
  preferredCountries,
  regions,
  format,
  initialValue,
  withCountryMeta,
  onChange,
  disabled,
  buttonFlagStyles,
  listFlagStyles,
  placeholder,
}) => {
  const [country, setCountry] = useState(getInitialCountry(defaultCountry, preferredCountries, regions))
  const [phoneNumber, setPhoneNumber] = useState(format === 'INTERNATIONAL' ? getInitialCountry(defaultCountry, preferredCountries, regions).dialCode : '')
  const [showCountries, setShowCountries] = useState(false)
  const phoneInputWrapper = useRef(null)
  const phoneInput = useRef(null)
  const countryList = useRef(null)
  const activeCountry = useRef(null)

  const { iso2 } = country
  const isMobile = detectMobile.any()

  const clickOutside = e => {
    if (phoneInputWrapper.current && !phoneInputWrapper.current.contains(e.target)) {
      setShowCountries(false)
    }
  }

  useEffect(() => {
    const data = withCountryMeta
      ? { phoneNumber, country: omit(country, ['hasAreaCodes', 'isAreaCode', 'dialCode', 'regions']) }
      : phoneNumber

    if (showCountries && iso2 && iso2 !== 'intl') {
      countryList.current.scrollTop = (activeCountry.current?.offsetTop - 50)
    }

    onChange(data)
  }, [country, phoneNumber, showCountries])

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside)

    if (initialValue) {
      const tel = initialValue.startsWith('+') ? initialValue.slice(1, 4) : initialValue.slice(0, 3)
      setCountry(prevCountry => (format === 'INTERNATIONAL' && getCountry(tel) ? getCountry(tel) : prevCountry))
      setPhoneNumber(formatNumber(initialValue, format, iso2))
    }

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [])

  const handleSelect = useCallback(countryCode => e => {
    const selectedCountry = findCountryBy('iso2', countryCode || e.target.value)

    setCountry(selectedCountry)
    setPhoneNumber(selectedCountry.dialCode)

    setShowCountries(false)

    phoneInput.current.focus()
  }, [country])

  const handleToggleList = useCallback(() => {
    if (!disabled) {
      setShowCountries(prevShowCountries => !prevShowCountries)
    }
  }, [showCountries])

  const handleChange = e => {
    const { value } = e.target
    const selectedCountry = getCountry(value)

    if (!value.length) {
      setCountry(getInitialCountry(defaultCountry, preferredCountries, regions))
      setPhoneNumber('')

      return
    }

    if (!(/^[\d ()+-]+$/).test(value)) return

    setCountry(prevCountry => (format === 'INTERNATIONAL' && selectedCountry ? selectedCountry : prevCountry))
    setPhoneNumber(formatNumber(value, format, iso2))
  }

  return (
    <div className="react-phonenr-input" ref={phoneInputWrapper}>
      {
        format === 'INTERNATIONAL' && (
          <div
            onClick={!isMobile ? handleToggleList : undefined}
            className="flag-wrapper"
            role="none"
          >
            {
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
                      ...buttonFlagStyles,
                    }}
                    svg
                  />
                )
            }
            {
              isMobile && (
                <select
                  className={className}
                  onChange={handleSelect()}
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
        className={className}
        type="tel"
        value={phoneNumber}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        ref={phoneInput}
        maxLength="21"
      />
      {
        showCountries && format === 'INTERNATIONAL' && !isMobile && (
          <ul className="country-list" ref={countryList}>
            {
              getCountryList(preferredCountries, regions).map(c => {
                if (c.isAreaCode) {
                  return null
                }

                return (
                  <li
                    key={c.iso2}
                    onClick={handleSelect(c.iso2)}
                    onKeyPress={handleSelect(c.iso2)}
                    className={cx('country-list-item', { 'active-country': c.iso2 === iso2 })}
                    ref={c.iso2 === iso2 ? activeCountry : null}
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

PhoneInput.propTypes = {
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
  /** Sets the initial Value of the Phone Number Input. This is usefull in case you need to set a phone number stored for example in a database */
  initialValue: PropTypes.string,
}

PhoneInput.defaultProps = {
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
  initialValue: null,
}

export default memo(PhoneInput)
