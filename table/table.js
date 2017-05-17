import React from 'react';
import ReactDOM from 'react-dom';
import { message, Table, Icon } from 'antd';

import PropTypes from 'prop-types';

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

class SliceTable extends React.Component {
  constructor(props) {
    super(props);
    const defaultCurrent = 2;

    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
    }
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };


    const onChange = (pagination, filters, sorter)=> {
      console.log('params in onChange:', pagination, filters, sorter);
      console.log( rowSelection, 'is rowSelection')
    }

    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
    }

    return (
        <Table onChange={onChange} rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
    );
  }
}

export default SliceTable;