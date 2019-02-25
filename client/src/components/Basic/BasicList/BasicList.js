import React from 'react'
import { Item } from 'semantic-ui-react'
import BasicItem from '../BasicItem/BasicItem'
import _ from 'lodash'
class BasicList extends React.Component {
    state = { selected: null, selectedMap: {} };
    handleLongPress = (id) => {
      this.state.selectedMap[id]
        ? this.setState({ selectedMap: _.omit(this.state.selectedMap, [ `${id}` ]) })
        : this.setState({ selectedMap: { ...this.state.selectedMap, [id]: true } })
      this.setState({ selected: id })
    };
    render () {
      const { list = [], children } = this.props
      const { selected } = this.state
      return (
        <Item.Group relaxed>
          {list.map((item, index) =>
            children({ item, key: index, index, selected, onLongPress: this.onLongPress, iconName: 'like' })
          )}
        </Item.Group>
      )
    }
}

export default BasicList
