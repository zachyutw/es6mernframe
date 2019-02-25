import React from 'react'
import PropTypes from 'prop-types'
import ProductConnect from '../../../redux/connecters/product.connecter'
import s from './ProductItem.module.css'
import Hammer from 'hammerjs'
import Editer from '../../Editor/Editer/Editer'
import InputAll from '../../Input/InputAll/InputAll'
import { Item, Icon, Button } from 'semantic-ui-react'
import _ from 'lodash'
const MODEL_NAME = 'product'
const MODEL_NAMES = MODEL_NAME + 's'
class ProductList extends React.Component {
    state = { selected: null, selectedMap: {} };
    componentDidMount () {
      this.props.getList({ params: this.props.params })
      this.props.getItemSchema()
    }
    handleLongPress = (id) => {
      this.state.selectedMap[id]
        ? this.setState({ selectedMap: _.omit(this.state.selectedMap, [ `${id}` ]) })
        : this.setState({ selectedMap: { ...this.state.selectedMap, [id]: true } })
      this.setState({ selected: id })
    };
    render () {
      const { selected } = this.state

      return (
        <Item.Group relaxed>
          {this.props[MODEL_NAMES].map((item, index) => (
            <ConnectProductItem key={index} {...item} selected={selected} onLongPress={this.handleLongPress} />
          ))}
        </Item.Group>
      )
    }
}

const ConnectedProductList = ProductConnect(ProductList)

class ProductItem extends React.Component {
    state = { actived: false, isMenu: false };
    hammerDom = React.createRef();
    static propTypes = {
      header: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
      title: PropTypes.string,
      iconName: PropTypes.string,
      imageSize: PropTypes.string,
      image: PropTypes.string,
      photoUrl: PropTypes.string,
      meta: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
      desc: PropTypes.string,
      id: PropTypes.string,
      onClick: PropTypes.func,
      description: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
      extra: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
      style: PropTypes.object
    };
    static defaultProps = { imageSize: 'tiny', onClick: () => console.log('prop click') };
    static List = ConnectedProductList;
    handleOnClick = () => {
      this.props.onClick(this.props.id)
      this.setState({ actived: !this.state.actived })
    };
    handleSwipe = (event, data) => {
      if (event.additionalEvent === 'panleft') {
        this.setState({ isMenu: true })
      }
      if (event.additionalEvent === 'panright') {
        this.setState({ isMenu: false })
      }
      console.log(event.additionalEvent)
    };
    handlePress = (event, data) => {
      console.log(event)
    };
    componentDidMount () {
      const mc = new Hammer(this.hammerDom.current)
      mc.on('pan', this.handleSwipe)
    }
    handleOnClickDelete = () => {
      this.props.deleteItem({ id: this.props.id })
    };
    handleEditSubmit = (value) => {
      this.props.putItem({ id: this.props.id, data: value })
    };
    render () {
      const {
        header,
        selected,
        id,
        title,
        iconName,
        imageSize,
        image,
        photoUrl,
        meta,
        description,
        desc,
        extra,
        style
      } = this.props
      const { actived, isMenu } = this.state
      return (
        <Item
          className={[ s.item, selected === id && s.selected, actived && s.actived ].join(' ')}
          // onClick={this.handleOnClick}
          style={style}
        >
          <Item.Image size={imageSize} src={image || photoUrl} />
          <Item.Content verticalAlign='middle'>
            <div ref={this.hammerDom}>
              <Item.Header className={[ s.header ].join(' ')}>
                <Editer
                  name='title'
                  value={title}
                  onSubmit={this.handleEditSubmit}
                  component={InputAll.Noraml}
                >
                  {(handleOnDoubleClick) => {
                    return (
                      <div onClick={handleOnDoubleClick}>
                        {iconName && <Icon name={iconName} />}
                        {header}
                        {title}
                      </div>
                    )
                  }}
                </Editer>
              </Item.Header>

              <Item.Meta>{meta}</Item.Meta>

              <Item.Description>
                <Editer
                  name='desc'
                  value={desc}
                  onSubmit={this.handleEditSubmit}
                  component={InputAll.Noraml}
                >
                  {(handleOnDoubleClick) => {
                    return (
                      <div onClick={handleOnDoubleClick}>
                        {description}
                        {desc}
                      </div>
                    )
                  }}
                </Editer>
              </Item.Description>
              <Item.Extra>
                {extra}
                {isMenu && (
                  <Button onClick={this.handleOnClickDelete} floated='right'>
                                    Delete
                  </Button>
                )}
              </Item.Extra>
            </div>
          </Item.Content>
        </Item>
      )
    }
}

const ConnectProductItem = ProductConnect(ProductItem)
export default ConnectProductItem
