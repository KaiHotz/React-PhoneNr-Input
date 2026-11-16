import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { PhoneInput } from './PhoneInput';

const baseProps = { name: 'phoneInput', onChange: vi.fn() };

describe('<PhoneInput />', () => {
  it('should render', () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should have default Country DE', () => {
    render(<PhoneInput {...baseProps} defaultCountry="DE" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('+49');
  });

  it('should call onChange', async () => {
    const onChange = vi.fn();
    render(<PhoneInput {...baseProps} onChange={onChange} />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(onChange).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<PhoneInput disabled {...baseProps} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
  });

  it('should allow custom className', () => {
    render(<PhoneInput {...baseProps} className="Custom" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('Custom');
  });

  it('initializes Somalia with its country code and dial code', () => {
    const onChange = vi.fn();
    render(<PhoneInput defaultCountry="SO" withCountryMeta onChange={onChange} />);

    expect(screen.getByRole('textbox')).toHaveValue('+252');
    expect(onChange).toHaveBeenLastCalledWith({
      phoneNumber: '+252',
      country: { name: 'Somalia (Soomaaliya)', iso2: 'SO' },
    });
  });

  it('shows Somalia in preferred countries and selects its +252 dial code', async () => {
    const onChange = vi.fn();
    const userEvent = user.setup();
    const { container } = render(<PhoneInput preferredCountries={['SO']} withCountryMeta onChange={onChange} />);

    await userEvent.click(container.querySelector('.flag-wrapper')!);
    await userEvent.click(screen.getByText(/\(\+252\) Somalia \(Soomaaliya\)/));

    expect(screen.getByRole('textbox')).toHaveValue('+252');
    expect(onChange).toHaveBeenLastCalledWith({
      phoneNumber: '+252',
      country: { name: 'Somalia (Soomaaliya)', iso2: 'SO' },
    });
  });

  it('resolves +1 829 numbers to the Dominican Republic', async () => {
    const onChange = vi.fn();
    const userEvent = user.setup();
    const { container } = render(<PhoneInput defaultCountry="DO" withCountryMeta onChange={onChange} />);
    const input = screen.getByRole('textbox');

    await userEvent.clear(input);
    await userEvent.type(input, '+18295551234');

    expect(input).toHaveValue('+1 829 555 1234');
    expect(container.querySelector('.flag-wrapper img')).toHaveAttribute('title', 'DO');
    expect(onChange).toHaveBeenLastCalledWith({
      phoneNumber: '+1 829 555 1234',
      country: { name: 'Dominican Republic (República Dominicana)', iso2: 'DO' },
    });
  });
});
