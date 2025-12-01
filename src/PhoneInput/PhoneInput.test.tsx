import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { CountryCode } from "libphonenumber-js";

import { PhoneInput } from "./PhoneInput";

const baseProps = {
  name: "phoneInput",
  onChange: vi.fn(),
};

describe("<PhoneInput />", () => {
  it("should render", () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  it("should have the initial dialCode", () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("");
  });

  it("should have default Country DE", () => {
    const props = {
      ...baseProps,
      defaultCountry: "DE" as CountryCode,
    };
    render(<PhoneInput {...props} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("+49");
  });

  it("should call onChange", async () => {
    render(<PhoneInput {...baseProps} />);
    const input = screen.getByRole("textbox");

    await user.click(input);

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it("should be disabled", () => {
    render(<PhoneInput disabled {...baseProps} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveProperty("disabled");
  });

  it("should allow custom className", () => {
    const props = {
      ...baseProps,
      className: "Custom",
    };
    render(<PhoneInput {...props} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveProperty("className");
  });
});
