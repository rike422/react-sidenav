import React from "react";

import { MemoryRouter, Route } from "react-router";
import { Nav, NavText, withRR4 } from "./index";
import { mount } from "enzyme";
import { pathToArray } from "./withRR4";

const SideNav = withRR4();

describe("withRR4 test", () => {
  const createSideNav = (initial = "/") => {
    return (
      <MemoryRouter initialEntries={[initial]}>
        <div>
          <SideNav
            default="dashboard"
            highlightBgColor="blue"
            highlightColor="white"
          >
            <Nav id="dashboard">
              <NavText> Dashboard </NavText>
            </Nav>
            <Nav id="sales">
              <NavText> Sales </NavText>
              <Nav id="list">
                <NavText> List Sales </NavText>
              </Nav>
            </Nav>
            <Nav id="products">
              <NavText> Products </NavText>
            </Nav>
          </SideNav>
          <div>
            <Route
              exact
              path="/"
              render={() => <div className="dashboard">Dashboard</div>}
            />
            <Route
              path="/sales"
              render={() => <div className="sales">Sales</div>}
            />
            <Route
              path="/products"
              render={() => <div className="products">Products</div>}
            />
          </div>
        </div>
      </MemoryRouter>
    );
  };
  it("selects an item when visiting an entry using default ", () => {
    const SideNavElement = createSideNav();
    const wrapper = mount(SideNavElement);
    expect(wrapper.find(".dashboard").length).toBe(1);
  });
  it("selects an item when visiting an entry not using default", () => {
    const SideNavElement = createSideNav("/sales");
    const wrapper = mount(SideNavElement);
    expect(wrapper.find(".sales").length).toBe(1);
  });
  it("selecting an item changes the route automatically", done => {
    const SideNavElement = createSideNav("/");
    const wrapper = mount(SideNavElement);
    const nav = wrapper.find(".__rsnav___item").at(1); //select sales

    nav.simulate("click");
    setTimeout(() => {
      expect(wrapper.instance().history.location.pathname).toBe("/sales");
      done();
    }, 0);
  });

  it("pathToArray exclude / when path starts with /", () => {
    const path = "/a/b";
    const arrPath = pathToArray(path);
    expect(arrPath[0]).toBe("a");
    expect(arrPath[1]).toBe("b");
    expect(arrPath.length).toBe(2);
  });
});
