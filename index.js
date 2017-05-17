import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message, Icon } from 'antd';

import PropTypes from 'prop-types';


import Pagination from './pagination/Pagination';
import Table from './table/table';

import 'babel-polyfill';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './sliceList/containers/App';
import configureStore from './sliceList/store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


/*

/*
class App extends React.Component {
  constructor(props) {
    super(props);
    const defaultCurrent = 2;

    this.state = {
      date: '',
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
      pageNumber: defaultCurrent
    }
  }

  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  onPagination = (argus) => {
    console.log('onPagination ', argus, this, this.state.pageNumber );
    this.setState({pageNumber: argus});
    console.log('onPagination2 ', argus, this, this.state.pageNumber );
  }

  render() {

    const { loading, selectedRowKeys } = this.state;

    const hasSelected = selectedRowKeys.length > 0;

    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {console.log('onChange;')
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   // on fire twice when first load
    //XXXXX
    //   getCheckboxProps: record => ({
    //     disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    //   }),
    // };

    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
    }

    return (
      <div style={{ width: 700, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
        <Table />

        <Pagination onPagination={this.onPagination.bind(this)} defaultCurrent={this.state.pageNumber} total={50} />

      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
*/