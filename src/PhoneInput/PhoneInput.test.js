import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneInput } from './PhoneInput';

describe('<PhoneInput />', () => {
  const baseProps = {
    name: 'phoneInput',
    onChange: jest.fn(),
  };

  it('should render', () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByTestId('PhoneNrInput');
    expect(input).toBeDefined();
  });

  it('should have the initial dialCode', () => {
    render(<PhoneInput {...baseProps} />);
    expect(screen.getByTestId('PhoneNrInput')).toHaveValue('');
  });

  it('should have default Country DE', () => {
    const props = {
      ...baseProps,
      defaultCountry: 'DE',
    };
    render(<PhoneInput {...props} />);

    expect(screen.getByTestId('PhoneNrInput')).toHaveValue('+49');
  });

  it('should call onChange', () => {
    render(<PhoneInput {...baseProps} />);
    fireEvent.click(screen.getByTestId('PhoneNrInput'));

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<PhoneInput disabled {...baseProps} />);

    expect(screen.getByTestId('PhoneNrInput')).toHaveProperty('disabled');
  });

  it('should allow custom className', () => {
    const props = {
      ...baseProps,
      className: 'Custom',
    };
    render(<PhoneInput {...props} />);

    expect(screen.getByTestId('PhoneNrInput')).toHaveProperty('className');
  });
});
