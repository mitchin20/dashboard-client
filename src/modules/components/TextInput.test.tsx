import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

test("render Text Input component with type text", async () => {
    render(<TextInput label="Text Input" type="text" />);

    const inputLabel = screen.getByText("Text Input");
    expect(inputLabel).toBeInTheDocument();

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "text");
});

test("render Text Input component with type area", async () => {
    render(<TextInput label="Text Input" type="area" />);

    const inputLabel = screen.getByText("Text Input");
    expect(inputLabel).toBeInTheDocument();

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "area");
});
