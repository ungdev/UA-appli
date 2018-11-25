import React from 'react';
import { Breadcrumb } from 'antd';
// import { Link } from 'react-router-dom';

class CustomBreadcrumb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: this.props.path,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.path })
  }
  render() {
    // let fullPath = '';
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {/* {this.state.path
          .slice(1)
          .split('/')
          .map((pathPart, key) => {
            fullPath += '/' + pathPart;
            return (
              <Breadcrumb.Item key={key}>
                <Link to={fullPath}>
                  {pathPart.charAt(0).toUpperCase() + pathPart.slice(1)}
                </Link>
              </Breadcrumb.Item>
            );
          })} */}
      </Breadcrumb>
    );
  }
}

export default CustomBreadcrumb;
