import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { ArchivePanel } from "../archive-panel.component";
import { EditorMode } from "../../../../../../../../../../core/enums/editor-mode.enum";

describe("Compoent: OptionPanel", () => {
    const initialState = { archiveState: { editorMode: EditorMode.None } };
    const mockStore = configureStore();
    let store;
    let props;
    beforeAll(() => {
        store = mockStore(initialState);
        props = { store };
    })

    it("Display: initial", () => {
        const rendered = renderer.create(
            <ArchivePanel {...props}/>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    })
}) 
