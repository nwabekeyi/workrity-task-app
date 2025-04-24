import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal.tsx"; 

describe("Modal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Prepare the modal element (if it doesn't already exist in the DOM)
    const modalDiv = document.createElement("div");
    modalDiv.id = "modal";
    document.body.appendChild(modalDiv);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Clean up the DOM after each test
    document.body.innerHTML = "";
  });

  test("should render modal and check if it's open", () => {
    render(
      <Modal onClose={mockOnClose} title="Test Modal">
        <p>Modal content goes here</p>
      </Modal>
    );

    // Check if the modal is rendered inside the element with id="modal"
    const modal = document.getElementById("modal");
    expect(modal).toBeInTheDocument(); // Ensure the modal container is present

    // Check if the modal's content is visible
    const modalContent = screen.getByText("Modal content goes here");
    expect(modalContent).toBeInTheDocument(); // Check that the content is rendered

    // Check if the modal is open by confirming it's displayed in the screen
    const modalBackdrop = screen.getByRole("dialog");
    expect(modalBackdrop).toBeVisible();
  });

  test("should call onClose when close button is clicked", () => {
    render(
      <Modal onClose={mockOnClose} title="Test Modal">
        <p>Modal content goes here</p>
      </Modal>
    );

    // Find the close button and simulate the click event
    const closeButton = screen.getByLabelText("close alert");
    fireEvent.click(closeButton);

    // Ensure the mock function is called on close
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("should close modal when clicking outside of it", () => {
    render(
      <Modal onClose={mockOnClose} title="Test Modal">
        <p>Modal content goes here</p>
      </Modal>
    );

    // Click on the backdrop (outside the modal)
    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);

    // Ensure the mock onClose function is called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
