import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import Header from './layout/Header.jsx';
import Row from './layout/Row.jsx';
import PagerToolbar from './plugins/pager/Toolbar.jsx';
import '../style/components/grid.styl';
import { prefix } from '../util/prefix';
import { CLASS_NAMES } from '../constants/GridConstants';

class Grid extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        dataSource: React.PropTypes.string,
        store: React.PropTypes.Func,
        pageSize: 25,
        startPage: 0,
        endPage: 1,
        enablePaging: true
    }

    render() {

        const { 
            columns, 
            data, 
            handleCellClick, 
            handleCellDblClick,
            pageSize,
            enablePaging,
            startPage,
            endPage
        } = this.props;

        const HeaderProps = {
            columns
        };

        const rowProps = {
            columns,
            data,
            handleCellClick,
            handleCellDblClick,
            pageSize,
            startPage,
            endPage,
            enablePaging
        };

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE),
            cellSpacing: 0
        };

        const pagerProps = {
            store: store,
            startPage,
            endPage,
            pageSize,
            enablePaging
        };

        return (
            <div>
                <table { ...tableProps }>
                    <thead>
                        <Header { ...HeaderProps } />
                    </thead>
                    <Row { ...rowProps } />
                    <tfoot>
                        <PagerToolbar { ...pagerProps } />
                    </tfoot>
                </table>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Grid);