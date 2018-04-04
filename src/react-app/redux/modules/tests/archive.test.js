import archiveReducer from ".././archive.js"
import * as actions from ".././archive.js"
import { EditorMode } from "../../../../core/enums/editor-mode.enum.js";

describe.only("Archive reducer", () => {
    it("Should return default state is state is null", () => {
        const state = archiveReducer();
        expect(state).not.toBe(null);
    });

    it("Test action: articles fetch started", () => {
        const state = archiveReducer(undefined, actions.articlesFetchStarted());
        expect(state.isFetched).toBe(false);
        expect(state.isFetching).toBe(true);
        expect(state.error).toBe(null);
    });

    it("Test action: articles fetch finished", () => {
        const data = [{ name: "Name" }];
        const state = archiveReducer(undefined, actions.aticlesFetchFinished(data));
        expect(state.isFetched).toBe(true);
        expect(state.isFetching).toBe(false);
        expect(state.error).toBe(null);
        expect(state.articles.length).toBe(1);
        expect(state.articles[0].name).toBe("Name");
    });

    it("Test action: articles fetch rejected", () => {
        const message = "Error";
        const state = archiveReducer(undefined, actions.articlesFetchRejected(message));
        expect(state.isFetched).toBe(true);
        expect(state.isFetching).toBe(false);
        expect(state.error).toBe(message);
    });

    it("Test action: set editor mode as Edit", () => {
        const state = archiveReducer(undefined, actions.setEditorMode(EditorMode.Edit));
        expect(state.editorMode).toBe(EditorMode.Edit);
    });

    it("Test action: async action resolve", (done) => {
        const dispatch = jasmine.createSpy("dispatch");
        const promise = actions.articlesFetching(Promise.resolve("value"))(dispatch);
        promise.then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith(actions.articlesFetchStarted());
            expect(dispatch).toHaveBeenCalledWith(actions.aticlesFetchFinished("value"));
            done()
        });
    });

    it("Test action: async action exception", (done) => {
        const dispatch = jasmine.createSpy("dispatch");
        const promise = actions.articlesFetching(Promise.reject("error"))(dispatch);
        promise.then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);  
            expect(dispatch).toHaveBeenCalledWith(actions.articlesFetchStarted());
            expect(dispatch).toHaveBeenCalledWith(actions.articlesFetchRejected("error"));
            done()
        });
    });
})