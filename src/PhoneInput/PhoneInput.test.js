import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { PhoneInput } from './PhoneInput';

describe('<PhoneInput />', () => {
  const baseProps = {
    name: 'phoneInput',
    onChange: jest.fn(),
  };

  it('should render', () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should have the initial dialCode', () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('should have default Country DE', () => {
    const props = {
      ...baseProps,
      defaultCountry: 'DE',
    };
    render(<PhoneInput {...props} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('+49');
  });

  it('should call onChange', () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByRole('textbox');

    user.click(input);

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<PhoneInput disabled {...baseProps} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveProperty('disabled');
  });

  it('should allow custom className', () => {
    const props = {
      ...baseProps,
      className: 'Custom',
    };
    render(<PhoneInput {...props} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveProperty('className');
  });
});
