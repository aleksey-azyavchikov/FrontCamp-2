

import React, { PureComponent } from "react";

import "./option-panel.component.scss";

export class OptionPanel extends PureComponent {

    getIconClasses(icon, currentMode, mode) {
        const defaultClasses = `panel-option oi ${icon} icon`;
        const selectedClass = currentMode === mode ? "selected-mode" : "";
        return `${defaultClasses} ${selectedClass}`

    }

    render() {
        const { currentMode, componentMode, iconClass, onModeClick } = this.props;

        return (
            <li class="list-inline-item">
                <span
                    id={componentMode}
                    onClick={() => onModeClick(componentMode)}
                    class={this.getIconClasses(iconClass, currentMode, componentMode)}>
                </span>
            </li>
        );
    }

}