import { ActionType } from "./action-type";

export const cardReducer = (state = getDefaultCards(), action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.AddCard: {
            newState = [
                ...state,
                action.payload
            ]
        } break;
        default: break;
    }
    return newState;
}

function getDefaultCards() {
    return [
        {
            header: "Features",
            title: "Support:",
            points: [
                "Bootstrap v4",
                "Webpack"
            ]
        },
        {
            header: "Directives",
            title: "Support:",
            points: [
                "If",
                "Switch-Case",
                "For",
                "Params"
            ]
        },
        {
            header: "Patterns",
            title: "Support:",
            linked: true,
            points: [  
                `<a href="https://github.com/aleksey-azyavchikov/FrontCamp-2/blob/module-4-patterns/src/js/core/decorators/singleton.decorator.js" 
                class="list-group-item list-group-item-action cs-card-text"><b>Singleton</b></a>`,
                `<a href="https://github.com/aleksey-azyavchikov/FrontCamp-2/blob/module-4-patterns/src/js/core/validation.js" 
                class="list-group-item list-group-item-action cs-card-text"><b>Factory Method</b></a>`,
                `<a href="https://github.com/aleksey-azyavchikov/FrontCamp-2/blob/module-4-patterns/src/js/core/html/html.analyzer.js" 
                class="list-group-item list-group-item-action cs-card-text"><b>Composite</b></a>`,
                `<a href="https://github.com/aleksey-azyavchikov/FrontCamp-2/blob/module-4-patterns/src/js/core/decorators/analyzers/analyzer-singleton.decorator.js" 
                class="list-group-item list-group-item-action cs-card-text"><b>Decorator</b></a>`,
            ]
        }
    ];
}