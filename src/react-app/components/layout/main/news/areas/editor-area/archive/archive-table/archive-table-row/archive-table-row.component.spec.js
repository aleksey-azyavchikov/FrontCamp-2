
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, render, configure } from "enzyme";
import { ArchiveTableRow } from "./archive-table-row.component";
import configureStore from "redux-mock-store"

configure({ adapter: new Adapter() });

describe("Component: Archive table row - display correctly", () => {
    const initialState = { archiveState: { selected: null } };
    const mockStore = configureStore();
    let store;
    beforeAll(() => {
        store = mockStore(initialState);
    })
    it("Check", () => {
        const props = { filter: "Filter", index: "1", article: { title: "Title" }, isSelected: false, store: store };
        const wrapper = mount(
            <ArchiveTableRow {...props}/>
        );
        const tr = wrapper.find("tr");
        expect(tr.hasClass("article")).toBe(true);
    });
});