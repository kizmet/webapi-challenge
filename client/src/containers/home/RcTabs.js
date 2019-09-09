import React, { createContext, useEffect } from 'react'
import { push } from 'connected-react-router'
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
  Icon
} from 'antd'
import { connect } from 'react-redux'
import {
  fetchAsync,
  updateAsyncId,
  addAsync,
  deleteAsync
} from '../../modules/projects'
import { fetchAsyncComments } from '../../modules/actions'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Tabs, { TabPane } from 'rc-tabs'
import 'rc-tabs/assets/index.css'
import TabContent from 'rc-tabs/lib/TabContent'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar'

const RcTabs = props => {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.projects)

  const onChange = key => {
    // for demo, better use router api
    //window.location.hash = key
    props.push('/1')
  }
  let activeKey = 'tab1'
  // const { children } = props
  // if (children) {
  //   projects.forEach(d => {
  //     if (d.component.type === children.type) {
  //       // for demo, better immutable
  //       d.component = children
  //       activeKey = d.id
  //     }
  //   })
  // }

  useEffect(() => {
    const loadData = () => dispatch(fetchAsync())
    loadData()
  }, [fetchAsync])

  return (
    <Tabs
      activeKey={activeKey}
      // onChange={onChange}
      renderTabBar={() => <ScrollableInkTabBar />}
      renderTabContent={() => <TabContent />}
      props={props}
      >
      {projects.map(d => (
        <TabPane 
          key={d.id} 
          tab={d.id}
          onClick={() => props.push('/1')}
          >
          {d.name}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default RcTabs
