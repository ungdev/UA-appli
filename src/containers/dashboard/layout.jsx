import React from 'react'
import { Layout } from 'antd'

import LeftBar from './components/LeftBar'
import TopBar from './components/TopBar'
import CustomBreadcrumb from './components/CustomBreadcrumb'
const { Content, Sider } = Layout


const DashboardLayout = props => {
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <TopBar sidebar={props.collapsed} />
        <Layout>
          <Sider width="250px">
            <LeftBar/>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <CustomBreadcrumb path={props.path} />
              <div
                style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {props.component}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default DashboardLayout