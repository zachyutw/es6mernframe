import React from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash';
import s from './BasicItem.module.css'
import Hammer from 'hammerjs'
import { Item, Icon, Button } from 'semantic-ui-react'

class BasicItem extends React.Component {
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
                {iconName && <Icon name={iconName} />}
                {header}
                {title}
              </Item.Header>

              <Item.Meta>{meta}</Item.Meta>
              <Item.Description>
                {description}
                {desc}
              </Item.Description>
              <Item.Extra>
                {extra}
                {isMenu && <Button floated='right'>Action</Button>}
              </Item.Extra>
            </div>
          </Item.Content>
        </Item>
      )
    }
}

export default BasicItem
