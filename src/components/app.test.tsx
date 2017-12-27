import * as React from "react";
import { shallow } from "enzyme";

import { App } from "./app";

test("<App />", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
