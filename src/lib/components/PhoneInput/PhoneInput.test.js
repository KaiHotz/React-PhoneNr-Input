import React from 'react'
import { shallow } from 'enzyme'
import PhoneInput from './PhoneInput'

describe('<PhoneInput />', () => {
  const baseProps = {
    onChange: jest.fn(),
  }

  it('should render', () => {
    const wrapper = shallow(<PhoneInput {...baseProps} />)

    expect(wrapper).toBeDefined()
  })

  it('should call onChange', () => {
    const wrapper = shallow(<PhoneInput {...baseProps} />)
    wrapper.simulate('change', { value: '+56' })

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
