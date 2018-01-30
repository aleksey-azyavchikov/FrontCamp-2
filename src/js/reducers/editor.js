import { ActionType } from "./action-type";
import { EditorMode } from "../core/enums/editor-mode.enum";

export const editorReducer = (state = defaultState(), action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.SetArchiveEditorMode: {
            newState = {
                ...newState,
                archiveMode: action.payload
            }
        } break;
        default: break;
    }
    return newState;
}

const defaultState = () => ({
    archiveMode: EditorMode.None
})