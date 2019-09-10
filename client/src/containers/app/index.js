import React from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Home from '../home'
import Project from '../project'
import { Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'

const App = ({ history }) => {
	const { Header, Content, Footer } = Layout
	const location = useSelector(state => state.router.location)
	const router = useSelector(state => state.router)
	return (
		<Layout>
			<Header>Projects and Actions</Header>
			<Content style={{ padding: '0 50px', marginTop: 14 }}>
				{console.table(router)}
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>
						<Link to={location.hash}>{`Home  ${location.pathname} `}</Link>
					</Breadcrumb.Item>
				</Breadcrumb>
				<Route
					exact
					path="/"
					name="home"
					breadcrumbName="Home"
					component={Home}
				/>
				<Route
					exact
					path="/:id"
					breadcrumbName="project-:id"
					name="project"
					component={Project}
				/>
			</Content>
		</Layout>
	)
}

//export default App
export default connect(null)(App)
