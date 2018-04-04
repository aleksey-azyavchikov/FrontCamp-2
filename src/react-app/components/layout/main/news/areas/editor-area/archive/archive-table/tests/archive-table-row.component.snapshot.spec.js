import React from "react";
import configureStore from "redux-mock-store";
import { ArchiveTableRow } from "../archive-table-row/archive-table-row.component";
import renderer from "react-test-renderer";

describe("Archive table row", () => {
    const initialState = { archiveState: { selected: null } };
    const mockStore = configureStore();
    let article;
    let index;
    let store;
    beforeAll(() => {
        article = {
            title: "Title",
            description: "Description",
            publishedAt: "3-2-2018",
            url: "http://test.com",
        };
        index = 5;
        store = mockStore(initialState);
    })
    it("Display correctly", () => {
        const filter = "test";
        const rendered = renderer.create(
            <ArchiveTableRow 
                store={store}
                article={article}
                index={index}
                filter={filter}
            />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    })
    
    it("Display correctly with highliting", () => {
        const filter = "ti";
        const rendered = renderer.create(
            <ArchiveTableRow
                store={store}
                article={article}
                index={index}
                filter={filter}
            />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    })
}) 
