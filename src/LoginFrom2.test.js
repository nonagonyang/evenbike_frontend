import React from "react";
import { render } from "@testing-library/react";
import LoginForm2 from "./LoginForm2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", function () {
  render(
    <BrowserRouter>
      <LoginForm2 />
    </BrowserRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <LoginForm2 />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when submit", async function () {
  const { getByText, getByLabelText } = render(
    <BrowserRouter>
      <LoginForm2 />
    </BrowserRouter>
  );

  expect(getByText("Sign In")).toBeInTheDocument();
});
