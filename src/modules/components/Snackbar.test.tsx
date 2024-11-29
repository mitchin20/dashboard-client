import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Snackbar from "./Snackbar";

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

test("render Snackbar component", async () => {
    const mockOnClose = jest.fn();

    render(
        <Snackbar
            open={true}
            message="Snackbar"
            position="top"
            autoHideDuration={3000}
            onClose={mockOnClose}
        />
    );

    const snackbarElement = screen.getByText("Snackbar");
    expect(snackbarElement).toBeInTheDocument();
});

test("close Snackbar after autoHideDuration", async () => {
    let open = true;
    const mockOnClose = jest.fn(() => {
        open = false;
    });

    jest.useFakeTimers();

    const { rerender, queryByText } = render(
        <Snackbar
            open={true}
            message="Snackbar"
            position="top"
            autoHideDuration={3000}
            onClose={mockOnClose}
        />
    );

    jest.advanceTimersByTime(3000);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    rerender(
        <Snackbar
            open={open}
            message="Snackbar"
            position="top"
            autoHideDuration={3000}
            onClose={mockOnClose}
        />
    );

    await waitFor(() => {
        expect(queryByText("Snackbar")).not.toBeInTheDocument();
    });
});
