//  We import our helper functions from the react-testing-library
//  The render function allows us to render Components
import {
  getAllByTestId,
  queryByText,
  render,
  getyByText,
  findByText,
  prettyDOM
} from "@testing-library/react";

// We import the component that we are testing
import Appointment from "../Appointment";
import Application from "../Application";


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
    const { container } = render(<Application />);

    const appointment = getAllByTestId(container, "appointment")[0];
    console.log(prettyDOM(appointment));

    ireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
  });

  
});



