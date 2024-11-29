import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from "./Tooltip";

test("render Tooltip component correctly", async () => {
    render(<Tooltip content="My tooltip popup">Hover over me</Tooltip>);

    // Act: Find the text that triggers the tooltip
    const triggerElement = screen.getByText("Hover over me");

    // Simulate hovering over the element
    await userEvent.hover(triggerElement);

    // Assert: Check if the tooltip content appears, waiting for it if necessary
    await waitFor(() => {
        expect(screen.getByText("My tooltip popup")).toBeInTheDocument();
    });

    // Optional: You can also test what happens when the hover ends
    await userEvent.unhover(triggerElement);
    expect(screen.queryByText("My tooltip popup")).not.toBeInTheDocument();
});
