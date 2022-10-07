import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", function () {
  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the Plan a trip button", async function () {
  const { getByText, getByLabelText } = render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );

  expect(getByText("Plan A Trip")).toBeInTheDocument();
  // const tripButton = getByText("Plan A Trip");

  // // click on the button
  // fireEvent.click(tripButton, new MouseEvent("click", { bubbles: true }));
  // // await waitFor(() => getByLabelText("Username"), {
  // //   timeout: 2000, // wait 2s
  // // });
  // // const username = getByText("Username");
  // // // expect the sign in page to show
  // // expect(username).toBeInTheDocument();
  // expect(getByText("Sign In")).not.toBeInTheDocument();
});
