import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAsyncAction } from '../../modules/actions'
import { Comment, Avatar, Form, Button, Input } from 'antd'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => {
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } }

  return (
    <Form>
      <Form.Item label="Description" {...formItemLayout}>
        <Input
          onChange={onChange}
          name="description"
          value={value.description}
        />
      </Form.Item>
      <Form.Item label="Notes" {...formItemLayout}>
        <Input onChange={onChange} name="notes" value={value.notes} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary">
          Add Action
        </Button>
      </Form.Item>
    </Form>
  )
}

const AddAction = ({ id }) => {
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()
  const isActionFetching = useSelector(state => state.actions.isActionFetching)
  const [value, setValue] = useState({
    project_id: Number(id),
    description: '',
    notes: 'a'
  })

  const handleSubmit = () => {
    if (!value) {
      return
    }

    setSubmitting(true)
    dispatch(addAsyncAction(id, value, setSubmitting))
  }

  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  return (
    <Comment
      content={
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
        />
      }
    />
  )
}

export default AddAction
