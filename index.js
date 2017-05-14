import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message, Table, Icon } from 'antd';

import PropTypes from 'prop-types';

import Pagination from './pagination/Pagination'

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  sorter: (a, b) => a.age - b.age
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  render: (text, record) => {
    console.log('record in columns of address:', record);
    return (
      <span>
        <a href="#">Action 一 {record.name}</a>
        <span className="ant-divider" />
        <a href="#">Delete</a>
        <span className="ant-divider" />
        <a href="#" className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    );
  }
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    const defaultCurrent = 2;

    this.state = {
      date: '',
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
      'pageNumber': defaultCurrent
    }
  }

  // getInitialState() {
  //   return {
  //     date: '',
  //     selectedRowKeys: [],  // Check here to configure the default column
  //     loading: false,
  //     'pageNumber': defaultCurrent
  //   }
  // }

  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  onPagination = (argus) => {
    console.log('onPagination ', argus);
    this.setState({'pageNumber': argus});
    console.log(this.state);
  }

  render() {

    const { loading, selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

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

    const onChange = (pagination, filters, sorter)=> {
      console.log('params in onChange:', pagination, filters, sorter);
      console.log( rowSelection, 'is rowSelection')
    }

    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
    }

    return (
      <div style={{ width: 700, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
        <Table onChange={onChange} rowSelection={rowSelection} dataSource={dataSource} columns={columns} />

        <Pagination onPagination={this.onPagination.bind(this)} defaultCurrent={this.state.pageNumber} total={50} />

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));