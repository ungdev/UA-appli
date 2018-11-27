import React from 'react'
import { connect } from 'react-redux'
import { Tree } from 'antd'

import '../admin.css'

const TreeNode = Tree.TreeNode

class RespoPermission extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: this.props.permission,
      selectedKeys: []
    }
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })

    this.props.checkedPermission(checkedKeys)
  }

  onSelect = (selectedKeys, info) => {
    this.setState({
      selectedKeys
    })
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }

      return <TreeNode {...item} />
    })
  }

  render() {
    let treeData = [
      {
        title: 'Tournoi LoL (pro)',
        key: '1',
        children: [
          {
            title: 'Envoi de messages',
            key: 'sendMessages.1'
          },
          {
            title: 'Modification d\'état',
            key: 'editState.1'
          }
        ]
      },
      {
        title: 'Tournoi LoL (amateur)',
        key: '2',
        children: [
          {
            title: 'Envoi de messages',
            key: 'sendMessages.2'
          },
          {
            title: 'Modification d\'état',
            key: 'editState.2'
          }
        ]
      },
      {
        title: 'Tournoi Fortnite',
        key: '3',
        children: [
          {
            title: 'Envoi de messages',
            key: 'sendMessages.3'
          },
          {
            title: 'Modification d\'état',
            key: 'editState.3'
          }
        ]
      },
      {
        title: 'Tournoi CS:GO',
        key: '4',
        children: [
          {
            title: 'Envoi de messages',
            key: 'sendMessages.4'
          },
          {
            title: 'Modification d\'état',
            key: 'editState.4'
          }
        ]
      },
      {
        title: 'Tournoi Hearthstone',
        key: '5',
        children: [
          {
            title: 'Envoi de messages',
            key: 'sendMessages.5'
          },
          {
            title: 'Modification d\'état',
            key: 'editState.5'
          }
        ]
      },
      {
        title: 'Tournoi SSBU',
        key: '6',
        children: [
          {
            title: 'Envoi de messages',
            key: 'sendMessages.6'
          },
          {
            title: 'Modification d\'état',
            key: 'editState.6'
          }
        ]
      },
      {
        title: 'Tournoi Libre',
        key: '7',
        children: [
          {
            title: 'Envoi de messages',
            key: 'sendMessages.7'
          }
        ]
      }
    ]

    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    )
  }
}

export default connect(
  null,
  null
)(RespoPermission)