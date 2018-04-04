
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import { OptionPanel } from "../option-panel/option-panel.component";
import { EditorMode } from "../../../../../../../../../../core/enums/editor-mode.enum";

configure({ adapter: new Adapter() });

describe("Component: OptionPanel", () => {
    let props;
    beforeAll(() => {
        props = {};
    });

    it("Initial", () => {
        const wrapper = mount(
            <OptionPanel {...props} />
        );
        expect(wrapper.length).toBe(1);
    });

    describe("Testing method: getIconClasses", () => {

        it("Should return correct icon class as pencil", () => {
            const icon = "pencil";
            const currentMode = EditorMode.Add;
            const componentMode = EditorMode.Edit;

            const wrapper = mount(
                <OptionPanel {...props} />
            );
            const expected = "panel-option oi pencil icon ";
            const actual = wrapper.instance().getIconClasses(icon, currentMode, componentMode)
            expect(actual).toBe(expected);
        });

        it("Should return correct icon class as selected", () => {
            const icon = "pencil";
            const currentMode = EditorMode.Add;
            const componentMode = EditorMode.Add;

            const wrapper = mount(
                <OptionPanel {...props} />
            );
            const expected = "panel-option oi pencil icon selected-mode";
            const actual = wrapper.instance().getIconClasses(icon, currentMode, componentMode)
            expect(actual).toBe(expected);
        });
    })
});