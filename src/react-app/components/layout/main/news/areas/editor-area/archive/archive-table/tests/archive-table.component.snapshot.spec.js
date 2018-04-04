import React from "react";
import configureStore from "redux-mock-store";
import { ArchiveTable } from "../archive-table.component";
import renderer from "react-test-renderer";

describe("Compoentn: Archive table:", () => {
    const initialState = { archiveState: { selected: null } };
    const mockStore = configureStore();
    let store;
    let props;
    beforeAll(() => {
        store = mockStore(initialState);
    })

    beforeEach(() => {
        props = { articles: [], store }
    })

    it("Display: initial", () => {
        const rendered = renderer.create(
            <ArchiveTable {...props}/>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    })
}) 
