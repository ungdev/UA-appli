import React from 'react';
import { Col, Row } from 'antd';

const Step = Steps.Step;

class LastInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
    );
  }
}

export default LastInfo;
