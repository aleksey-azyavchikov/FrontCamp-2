import { ActionType } from "./action-type";

export const articleReducer = (state = { articles: [], selected: null }, action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.SelectArticle: {
            newState = {
                selected: { ...action.payload },
                articles: newState.articles
            }
        } break;
        case ActionType.UpdateArticles: {
            newState = {
                selected: newState.selected,
                articles: [...action.payload]
            }
        } break;
        default: break;
    }
    return newState;
}