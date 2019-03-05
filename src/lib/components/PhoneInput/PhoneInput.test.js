import React from 'react'
import { shallow, mount } from 'enzyme'
import PhoneInput from './PhoneInput'

describe('<PhoneInput />', () => {
  const baseProps = {
    onChange: jest.fn(),
  }

  it('should render', () => {
    const wrapper = shallow(<PhoneInput {...baseProps} />)

    expect(wrapper).toBeDefined()
  })

  it('should have the initial dialCode', () => {
    const wrapper = mount(<PhoneInput {...baseProps} />)
    const input = wrapper.find('input')

    expect(input.prop('value')).toBe('+1')
  })

  it('should have default Country de', () => {
    const wrapper = mount(<PhoneInput {...baseProps} defaultCountry="de" />)
    const input = wrapper.find('input')

    expect(input.prop('value')).toBe('+49')
  })

  it('should call onChange', () => {
    const wrapper = mount(<PhoneInput {...baseProps} />)
    wrapper.find('input').simulate('change', { target: { value: '+56' } })

    expect(baseProps.onChange).toHaveBeenCalled()
  })

  it('should be disableable', () => {
    const wrapper = shallow(<PhoneInput disabled {...baseProps} />)

    expect(wrapper.prop('disabled')).toBe(true)
  })

  it('should allow custom className', () => {
    const props = {
      ...baseProps,
      className: 'Custom',
    }
    const wrapper = shallow(<PhoneInput {...props} />)

    expect(wrapper.hasClass(props.className)).toBe(true)
  })
})
