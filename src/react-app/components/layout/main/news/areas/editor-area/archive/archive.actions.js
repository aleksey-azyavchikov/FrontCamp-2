import { createAction } from "redux-act";

export const articlesFetchStarted = createAction("Fetch articles started");
export const aticlesFetchFinished = createAction("Fetch articles finished");
export const articlesFetchRejected = createAction("Fetch articles rejected");

