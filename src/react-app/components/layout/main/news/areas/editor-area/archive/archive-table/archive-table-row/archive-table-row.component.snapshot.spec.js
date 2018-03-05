import ArchiveTableRow from "./archive-table-row.component";
import renderer from "react-test-renderer";
import React from "react";

describe("Archive table row", () => {
    let article;
    let index;
    beforeAll(() => {
        article = {
            title: "Title",
            description: "Description",
            publishedAt: "3-2-2018",
            url: "http://test.com",
        };
        index = 5;
    })
    it("Display correctly", () => {
        const filter = "test";
        const rendered = renderer.create(
            <ArchiveTableRow 
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
                article={article}
                index={index}
                filter={filter}
            />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    })
}) 
