//  We import our helper functions from the react-testing-library
//  The render function allows us to render Components
import { render } from "@testing-library/react";

// We import the component that we are testing
import Appointment from "../Appointment";


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