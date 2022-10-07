import React from "react";
import { render } from "@testing-library/react";
import RegisterForm2 from "./RegisterForm2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", function () {
  render(
    <BrowserRouter>
      <RegisterForm2 />
    </BrowserRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <RegisterForm2 />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when submit", async function () {
  const { getByText, getByLabelText } = render(
    <BrowserRouter>
      <RegisterForm2 />
    </BrowserRouter>
  );

  expect(getByText("Sign Up")).toBeInTheDocument();
});
