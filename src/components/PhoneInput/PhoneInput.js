import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import ReactCountryFlag from 'react-country-flag';
import { allCountries, Countries } from '../../utils'

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
    const { defaultCountry, preferredCountries } = props

    this.state = {
      selectedCountry: Countries.getInitial(defaultCountry, preferredCountries),
      phoneNumber: '',
      showCountries: false,
    }

    this.phoneInput = createRef()
  }

  componentDidMount() {
    console.log('getAllCountries', Countries.getAll()); // eslint-disable-line
    console.log('filterBy', Countries.filterBy('iso2', 'de')); // eslint-disable-line
    console.log('guess', Countries.guess('+49')); // eslint-disable-line
    console.log('getRegions str', Countries.getRegions('oceania') ); // eslint-disable-line
    console.log('getRegions arr', Countries.getRegions(['oceania', 'africa'])); // eslint-disable-line
    console.log('getPreferred', Countries.getPreferred(['us', 'de', 'ar'])); // eslint-disable-line
    console.log('getInitial default', Countries.getInitial('at', [])); // eslint-disable-line
    console.log('getInitial arr', Countries.getInitial('br', ['ar', 'de', 'us'])); // eslint-disable-line
  }

  handleClickOutside() {
    this.setState({
      showCountries: false,
    })
  }

  handleClick = code => () => {
    const selectedCountry = allCountries.find(c => c.iso2 === code)

    this.setState({
      selectedCountry,
      phoneNumber: selectedCountry.dialCode,
      showCountries: false,
    })

    this.phoneInput.current.focus()
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

    return preferredCountries.length ? this.filterCountries() : regions ? Countries.getRegions(regions) : allCountries
  }

  handleChange = e => {
    const { value } = e.target
    let phoneNumber = value === '+' || value.startsWith('0') ? '' : `+${value.replace(/[^0-9.]+/g, '')}`

    let selectedCountry = allCountries.find(c =>
      c.dialCode.startsWith(phoneNumber.substring(0, 20))) || this.state.selectedCountry

    if (value === '+' || value.startsWith('0')) {
      phoneNumber = ''
      selectedCountry = this.getInitialCountry()
    }

    const { iso2, dialCode } = selectedCountry

    if (value.slice(dialCode.length).length > 2) {
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
    const { placeholder, disabled } = this.props

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
                this.getCountryList().map((c, i)=> {
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
