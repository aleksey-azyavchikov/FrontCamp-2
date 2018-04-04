
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import { ArchiveTableRow } from "../archive-table-row/archive-table-row.component";
import { setSelectedArticle } from "../../../../../../../../../redux/modules/archive";
import configureStore from "redux-mock-store"

configure({ adapter: new Adapter() });

describe("Component: Archive table row - display correctly", () => {
    const initialState = { archiveState: { selected: null } };
    const mockStore = configureStore();
    let props;
    let store;
    beforeAll(() => {
        store = mockStore(initialState);
        props = { filter: "Filter", index: "1", article: { title: "Title" }, isSelected: false, store: store };
    });

    it("Initial", () => {
        const wrapper = mount(
            <ArchiveTableRow {...props} />
        );
        expect(wrapper.length).toBe(1);
    });

    it("Should has correct class for tr element", () => {
        const wrapper = mount(
            <ArchiveTableRow {...props} />
        );
        const tr = wrapper.find("tr");
        expect(tr.hasClass("article")).toBe(true);
    });


    it("Should set selected article when we click on table row", () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        const wrapper = mount(
            <ArchiveTableRow {...props} />
        );
        const tr = wrapper.find("tr");
        tr.simulate("click");

        expect(mockDispatch).toBeCalledWith(setSelectedArticle(props.article));
    });
});