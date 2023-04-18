import React from "react";

import { render, cleanup, getByTestId, getByDisplayValue, getAllByDisplayValue } from "@testing-library/react";

import { prettyDOM } from "@testing-library/react";

import { fireEvent } from "@testing-library/react";

import { waitForElement, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText, queryByAltText} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe("Application", () => {
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug} = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  expect(
    getByText(appointment, "Are you sure you would like to delete?")
  ).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => getByAltText(appointment, "Add"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async ()=> {

  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  // 3. Click the "Edit" button on the booked appointment.
  fireEvent.click(getByAltText(appointment, "Edit"));

  // 4. Wait until the Form element is displayed.
  expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument()

  //Enter the name to the form
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 5. Wait until the text "Lydia Miller-Jones" is displayed.
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 5. Click the "Save" button on the confirmation.
  fireEvent.click(getByText(appointment, "Save"));

  // 6. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // 7.Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

})

})
