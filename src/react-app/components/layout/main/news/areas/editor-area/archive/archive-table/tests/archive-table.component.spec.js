
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import { ArchiveTable } from "../archive-table.component";
import configureStore from "redux-mock-store"

configure({ adapter: new Adapter() });

describe("Component: Archive table:", () => {
    const initialState = { archiveState: { selected: null } };
    const mockStore = configureStore();
    let props;
    let store;
    beforeAll(() => {
        store = mockStore(initialState);
        props = { store, articles: [] };
    });

    it("Initial", () => {
        const wrapper = mount(
            <ArchiveTable {...props} />
        );
        expect(wrapper.length).toBe(1);
    });

    it("Should headers displayed", () => {
        const wrapper = mount(
            <ArchiveTable {...props} />
        );

        const ths = wrapper.find("th");
        expect(ths.length).toBe(5);
    });
});