import React, { PropTypes } from 'react';
import { Input } from './Input';
import { CLASS_NAMES } from './../../../../../constants/GridConstants';
import { prefix } from './../../../../../util/prefix';
import { nameFromDataIndex } from './../../../../../util/getData';

const wrapperCls = prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER);

export const Editor = ({
    cellData,
    columns,
    editorState,
    index,
    isEditable,
    isRowSelected,
    rowId,
    stateKey,
    store
}) => {

    if (!editorState) {
        return;
    }

    if (!editorState[rowId]) {
        editorState[rowId] = {};
    }

    editorState[rowId].key = rowId;

    let colName = columns
        && columns[index]
        ? nameFromDataIndex(columns[index])
        : '';

    if (!colName) {
        colName = columns
        && columns[index]
        && columns[index].name
        ? columns[index].name
        : '';
    }

    const value = editorState[rowId].values
        ? editorState[rowId].values[colName]
        : null;

    const editableFuncArgs = {
        row: editorState[rowId],
        isRowSelected,
        store
    };

    if (isEditable
        && columns[index]
        && columns[index].editor
        && (columns[index].editable === undefined || columns[index].editable)
        && (typeof columns[index].editable === 'function'
                ? columns[index].editable(editableFuncArgs)
                : true)
        && typeof columns[index].editor === 'function') {

        const input = columns[index].editor(
            {
                column: columns[index],
                columns,
                store,
                rowId,
                row: editorState[rowId] || { key: rowId },
                columnIndex: index,
                value: value || cellData,
                isRowSelected,
                stateKey
            }
        );

        return (
            <span { ...{ className: wrapperCls } }> { input } </span>
            );
    }

    else if (isEditable
        && columns[index]
        && (columns[index].editable === undefined || columns[index].editable)
        && (typeof columns[index].editable === 'function'
                ? columns[index].editable(editableFuncArgs)
                : true)) {
        return (
            <span { ...{ className: wrapperCls } }>
                <Input {
                        ...{
                            column: columns[index],
                            columns,
                            editorState,
                            rowId,
                            cellData,
                            stateKey,
                            store
                        }
                    }
                />
            </span>
            );
    }

    return (
        <span { ...{ className: prefix(CLASS_NAMES.INACTIVE_CLASS) } } >
            { cellData }
        </span>
        );
};

Editor.propTypes = {
    cellData: PropTypes.any,
    columns: PropTypes.array,
    editorState: PropTypes.object,
    index: PropTypes.number,
    isEditable: PropTypes.bool,
    isRowSelected: PropTypes.bool,
    rowId: PropTypes.string,
    stateKey: PropTypes.string,
    store: PropTypes.object
};

Editor.defaultProps = {
    isRowSelected: false
};
