

import React from "react";
import { connect } from "react-redux";
import { EditorMode } from "../../../../../../../../../core/enums/editor-mode.enum";
import { setEditorMode } from "../archive.actions";
import { OptionPanel } from "./option-panel/option-panel.component";
import "./archive-panel.component.scss";

class ArchivePanelPresenter extends React.Component {
    render() {
        const options = [{
            mode: EditorMode.Add,
            iconClass: "oi-plus"
        }, {
            mode: EditorMode.Edit,
            iconClass: "oi-pencil"
        }]

        const optionsComponent = options.map((option, index) => (
            <OptionPanel
                key={index}
                componentMode={option.mode}
                currentMode={this.props.mode}
                onModeClick={this.props.onModeClick}
                iconClass={option.iconClass}
            />
        ));

        return (
            <div class="panel">
                <ul class="list-inline">
                    {optionsComponent}
                </ul>
            </div>
        );
    }


}

export const ArchivePanel = connect(
    (state) => ({
        mode: state.archiveState.editorMode
    }),
    (dispatch) => ({
        onModeClick: (mode) => { dispatch(setEditorMode(mode)) }
    })
)(ArchivePanelPresenter)