
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store"
import { mount, configure } from "enzyme";
import { ArchivePanel } from "../archive-panel.component";
import { EditorMode } from "../../../../../../../../../../core/enums/editor-mode.enum";

configure({ adapter: new Adapter() });

describe("Component: ArchivePanel", () => {
    const initialState = { archiveState: { editorMode: EditorMode.None } };
    const mockStore = configureStore();
    let store;
    let props;
    beforeAll(() => {
        store = mockStore(initialState);
        props = { store };
    });

    it("Initial", () => {
        const wrapper = mount(
            <ArchivePanel {...props} />
        );
        expect(wrapper.length).toBe(1);
    });
});