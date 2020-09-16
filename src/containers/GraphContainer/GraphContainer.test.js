import React from "react";
import { render } from "@testing-library/react";

import { shallow } from "enzyme";

import GraphContainer from "./index";

describe("BAN Testing", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BANList />);
  });

  test("render the total spent BAN to be N/A", () => {
    expect(wrapper.find(".ban-spent").text()).toBe("N/A");
  });

  test("render the metric MPG", () => {
    expect(wrapper.find(".ban-mpg").text()).toBe("N/A");
  });
});
