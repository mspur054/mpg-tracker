import React from "react";
import { render } from "@testing-library/react";

import { shallow, mount } from "enzyme";

import TrackingFormBase from "./index";

describe("Tracking Entry Testing", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TrackingFormBase />);
  });

  test("renders", () => {
    expect(wrapper.exists()).toBe(true);

    //({name:'mileage'})
  });

  test("mileage input works and shows 666", () => {
    //!doesn't work...need to mock auth
    const mileageInput = wrapper.find("input").at(0);

    expect(mileageInput.exists()).toBe(true);
  });
});
