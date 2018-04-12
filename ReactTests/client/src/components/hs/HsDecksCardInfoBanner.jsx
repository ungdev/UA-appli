import React from 'react';
import { Col, Icon, Row, Tag } from 'antd';

class HsDecksCardInfoBanner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.card);
    return (
      <Row justify="center">
        <Col span={6}>
          <Tag color="#2db7f5">{this.props.card[0].cost}</Tag>
        </Col>
        <Col span={12}>{this.props.card[0].name.toUpperCase()}</Col>
        <Col span={6}>
          <Tag>
            {this.props.card[0].rarity == 'LEGENDARY' ? (
              <Icon type="star" />
            ) : (
              <div>{this.props.card[1]}</div>
            )}
          </Tag>
        </Col>
      </Row>
    );
  }
}

export default HsDecksCardInfoBanner;
