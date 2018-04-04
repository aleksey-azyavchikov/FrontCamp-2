import React from "react";
import { OptionPanel } from "../option-panel/option-panel.component";
import renderer from "react-test-renderer";

describe("Compoent: OptionPanel", () => {
    let props;
    beforeAll(() => {
    })

    beforeEach(() => {
        props = { }
    })

    it("Display: initial", () => {
        const rendered = renderer.create(
            <OptionPanel {...props}/>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    })
}) 
