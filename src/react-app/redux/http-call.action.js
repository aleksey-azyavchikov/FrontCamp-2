export const httpCallAction = (dispatch, promise, startAction, finishAction, rejectAction) => {
    dispatch(startAction())
    promise
        .then(data => dispatch(finishAction(data)))
        .catch(error => dispatch(rejectAction(error)))
}