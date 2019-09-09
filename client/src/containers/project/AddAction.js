import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAsyncAction } from '../../modules/actions'
import { Comment, Avatar, Form, Button, Input } from 'antd';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Action
      </Button>
    </Form.Item>
  </div>
);


const AddAction = ({ id }) => {
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()
  const isActionFetching = useSelector(
    state => state.actions.isActionFetching
  )


const [value, setValue] = useState({text: ''})

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);
    dispatch(addAsyncAction(id, value, setSubmitting))
  }

  const handleChange = e => {
    setValue({text: e.target.value}
    );
  };

  return (
    <div>
        <Comment
          avatar={
            <Avatar
              src='https://static.thenounproject.com/png/82766-200.png'
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value.text}
            />
          }
        />
    </div>
  )
}

export default AddAction
