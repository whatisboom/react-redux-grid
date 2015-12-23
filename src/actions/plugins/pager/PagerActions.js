import {
    PAGE_LOCAL,
    PAGE_REMOTE,
    SET_DATA,
    ERROR_OCCURRED
} from '../../../constants/ActionTypes';

import { setLoaderState } from '../../../actions/plugins/loader/LoaderActions';

import Request from '../../../components/plugins/ajax/Request';

export function setPage(index, type, BUTTON_TYPES) {

    const pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return { type: PAGE_LOCAL, pageIndex };
}

export function setPageAsync(index, pageSize, type, BUTTON_TYPES, datasource) {

    const pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return (dispatch) => {

        dispatch(setLoaderState(true));

        return Request.api({
            route: datasource,
            method: 'POST',
            data: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        }).then((response) => {

            if (response && response.data) {

                dispatch({
                    type: PAGE_REMOTE,
                    pageIndex: pageIndex
                });

                dispatch({
                    type: SET_DATA,
                    data: response.data,
                    total: response.total,
                    currentRecords: response.data,
                    success: true
                });

                dispatch(setLoaderState(false));
            }

            else {
                dispatch({
                    type: ERROR_OCCURRED,
                    error: response,
                    errorOccurred: true
                });
            }

        });
    };
}