import React, { createContext } from 'react'
import { push } from 'connected-react-router'
import { Route, Link } from 'react-router-dom'
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Badge,
  Menu,
  Dropdown,
  Icon,
  Switch,
  Breadcrumb
} from 'antd'
import { connect } from 'react-redux'
import {
  fetchAsync,
  updateAsyncId,
  addAsync,
  deleteAsync
} from '../../modules/projects'
import { fetchAsyncActions } from '../../modules/actions'
import { bindActionCreators } from 'redux'

const EditableContext = createContext()

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }
  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    )
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], editingKey: '', project: [], count: null }
    this.columns = [
      //     {
      //   title: 'id',
      //   dataIndex: 'id',
      //   width: '10%',
      //   editable: false,
      // },
      {
        title: 'Name',
        dataIndex: 'name',
        width: '15%',
        editable: true,
        render: (text, record) => {
          return (
            <a onClick={() => this.props.history.push(`/${record.id}`)}>
              {record.name}
            </a>
          )
        }
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '40%',
        editable: true
      },
      {
        title: 'Completed',
        dataIndex: 'completed',
        width: '15%',
        editable: false,
        render: (text, record) => {
          return (
            <EditableContext.Consumer>
              {form => (
                <Switch
                  checked={record.completed}
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                  onClick={() => this.toggleComplete(form, record)}
                />
              )}
            </EditableContext.Consumer>
          )
        }
      },
      {
        title: 'Edit',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state
          const editable = this.isEditing(record)
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record)}
                    style={{ marginRight: 8 }}>
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.id)}>
                <a style={{ marginRight: 8 }}>Cancel</a>
              </Popconfirm>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.delete(record.id)}>
                <a>Delete</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record)}>
              Edit
            </a>
          )
        }
      }
    ]
  }

  componentDidMount() {
    const { fetchAsync } = this.props
    this.fetchData(fetchAsync)
  }

  fetchData = async fetchAsync => {
    try {
      await fetchAsync()
      await this.setState({
        data: this.props.projects,
        editingKey: '',
        count: 2
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
  edit(record) {
    this.setState({ ...this.state, project: record, editingKey: record.id })
  }

  isEditing = record => record.id === this.state.editingKey
  cancel = () => {
    this.setState({ editingKey: '' })
  }
  save(form, record) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      const index = this.props.projects.findIndex(item => record.id === item.id)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        const change = {
          ...item,
          ...row
        }
        this.setState({ data: newData, editingKey: '' })
        this.props.updateAsyncId({
          ...item,
          ...row
        })
      } else {
        const newData = [...this.props.projects]
        const addProject = async () => {
          await this.props.addAsync(row)
          await newData.push(this.props.project)
          await this.setState({ data: newData, editingKey: '' })
        }
        addProject()
      }
    })
  }

  toggleComplete(form, record) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      const index = this.props.projects.findIndex(item => record.id === item.id)
      if (index > -1) {
        const toggle = newData[index]
        const item = { ...toggle, completed: !toggle.completed }
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        const change = {
          ...item,
          ...row
        }
        this.setState({ data: newData, editingKey: '' })
        this.props.updateAsyncId({
          ...item,
          ...row
        })
      } else {
        return
        // newData.push(row)
        // this.setState({ data: newData, editingKey: '' })
        // this.props.addAsync(row)
      }
    })
  }

  delete(record) {
    const newData = this.state.data.filter(item => item.id !== record)
    this.setState({ ...this.state, data: newData, editingKey: '' })
    this.props.deleteAsync(record)
  }
  handleAdd = () => {
    const { count, data } = this.state
    const newData = {
      id: count,
      name: '',
      description: ''
    }
    this.setState({
      data: [...data, newData],
      count: count + 1,
      editingKey: count
    })
    console.table(data)
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    }

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'id' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })

    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}>
          Add a Project
        </Button>

        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            bordered
            dataSource={this.state.data}
            rowKey={record => record.id}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel
            }}
          />
        </EditableContext.Provider>
      </div>
    )
  }
}

const Home = Form.create()(EditableTable)

const mapStateToProps = ({ projects, actions }) => ({
  projects: projects.projects,
  project: projects.project,
  isFetching: projects.isFetching,
  actions: actions.actions,
  isActionFetching: actions.isActionFetching
})

export default connect(
  mapStateToProps,
  { fetchAsync, updateAsyncId, addAsync, deleteAsync, fetchAsyncActions }
)(Home)
