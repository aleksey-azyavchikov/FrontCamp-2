import { Component } from "../../../core/decorators/component.decorator";
import BaseComponent from "../../base.component";
import NavigationComponent from "../../navigation/navigation.component";
import { SubPageType } from "../../../core/enums/subpage-type.enum";

@Component({
    selector: "fc-editor-area",
    template: require("./editor-area.component.html"),
    styles: require("./editor-area.component.scss"),
    children: [
        NavigationComponent
    ]
})
export default class EditorAreaComponent extends BaseComponent {
    constructor() {
        super();
        this.subscriptions = [];
        this.navigationItems = [
            SubPageType.Archive, 
            SubPageType.Preview
        ];
        this.activeSubPage = this.navigationItems[0];
    }

    initializeHook() {
        this.subscriptions.push(this.config.store.state$
            .map(state => state.activeSubPage)
            .filter(activePage => this.activeSubPage !== activePage)
            .filter(activePage => this.isActiveSubPageExist(activePage))
            .do(activePage => this.activeSubPage = activePage)
            .do(() => this.render())
            .subscribe()
        );
    }

    isActiveSubPageExist(activePage) {
        let result = Boolean(this.navigationItems.find(item => item === activePage));
        return result;
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}