//  We import our helper functions from the react-testing-library
//  The render function allows us to render Components
import {
  getAllByTestId,
  fireEvent,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  render,
  getByText,
  findByText,
  queryByAltText,
  findByAltText,
  waitForElementToBeRemoved,
  prettyDOM,
  debug,
} from "@testing-library/react";

// We import the component that we are testing
import Appointment from "../Appointment";
import Application from "../Application";
import axios from "axios";


// A test that renders a React Component

it("renders without crashing", () => {
  render(<Appointment />);
});

describe("Appointment", () => {
  test("renders without crashing", () => {
    render(<Appointment />);
  });

  test("does something it is supposed to do", () => {
    // ...
  });

  test("does something else it is supposed to do", () => {
    // ...
  });

  xit("does something it is supposed to do", () => {
    // ...
  });
  
  // or if using test
  test.skip("does something it is supposed to do", () => {
    // ...
  });
  
});

describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await findByText(container, "Archie Cohen");

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await findByText(appointment, "Lydia Miller-Jones");

    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // 7. Wait until the element with the "Add" button is displayed.
    await findByAltText(appointment, "Add");
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");
    
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    // 4. Click "Alec Quon" to change interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // 7. Wait until the element with the text "Archie Cohen" is displayed.
    await findByText(appointment, "Archie Cohen");
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));    
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    const { container, debug } = render(<Application />);
  
    axios.put.mockRejectedValueOnce();
  
    await findByText(container, "Archie Cohen");
  
    const appointments = getAllByTestId(container, "appointment");
  
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    await findByText(appointment, "Could not book appointment.");
  
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  
  
  it("shows the delete error when failing to delete an appointment", async () => {
    const { container, debug } = render(<Application />);
  
    axios.delete.mockRejectedValueOnce();
  
    await findByText(container, "Archie Cohen");
  
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Delete"));
  
    fireEvent.click(getByText(appointment, "Confirm"));
  
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    await findByText(appointment, "Could not cancel appointment.");
  
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

});



