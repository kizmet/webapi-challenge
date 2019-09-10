import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { fetchAsyncId } from '../../modules/projects'
import { fetchAsyncActions } from '../../modules/actions'
import { Comment, Tooltip, List, Descriptions, Icon } from 'antd'
import AddAction from './AddAction'

const Project = ({ match }) => {
  const id = match.params.id
  const dispatch = useDispatch()
  const project = useSelector(state => state.projects.project)
  const isFetching = useSelector(state => state.projects.isFetching)
  const isActionFetching = useSelector(state => state.actions.isActionFetching)
  const actions = useSelector(state => state.actions.actions)
  const isAdding = useSelector(state => state.actions.isAdding)

  useEffect(() => {
    const loadData = id => dispatch(fetchAsyncId(id))
    loadData(id)
  }, [fetchAsyncId, id])

  useEffect(() => {
    const loadActions = id => dispatch(fetchAsyncActions(id))
    loadActions(id)
  }, [id, fetchAsyncActions, isAdding])

  return (
    <div>
      <h1>{`${project.name}`}</h1>

      {!isFetching && (
        <Descriptions>
          <Descriptions.Item label="Description">
            {project.description}
          </Descriptions.Item>
        </Descriptions>
      )}
      <List
        className="action-list"
        header={`${actions.length} Actions`}
        itemLayout="horizontal"
        dataSource={actions}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.description}
              avatar={<Icon type="right" />}
              description={item.notes}
            />
          </List.Item>
        )}
      />
      <AddAction id={id} />
    </div>
  )
}

//export default Project
export default connect(null)(Project)
