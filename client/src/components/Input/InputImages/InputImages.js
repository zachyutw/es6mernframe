import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import s from './InputImages.module.css'

class InputImage extends Component {
    state = { images: [] };
    static propTypes = {
      name: PropTypes.string,
      label: PropTypes.string,
      propChange: PropTypes.func,
      image: PropTypes.object,
      staticImage: PropTypes.string,
      className: PropTypes.string,
      style: PropTypes.object,
      multiple: PropTypes.bool,
      isExtends: PropTypes.bool,
      accept: PropTypes.string,
      placeholder: PropTypes.string,
      defaultImg: PropTypes.string,
      maxLength: PropTypes.number,
      tags: PropTypes.string,
      basic: PropTypes.bool,
      input: PropTypes.object
    };
    static defaultProps = {
      name: 'images',
      className: '',
      style: {},
      multiple: true,
      isExtends: false,
      input: {},
      image: { imageUrl: null },
      maxLength: -1,
      basic: false,
      tags: '#normal',
      accept: 'image/x-png,image/jpg,image/jpeg'
    };
    componentDidUpdate (prevProps) {
      if (prevProps.images !== this.props.images) {
        if (_.isEmpty(this.props.images)) {
          this.setState({ images: this.props.images })
        }
      }
    }
    handleOnChange = (event) => {
      const { isExtends, tags } = this.props
      const name = event.target.name || 'images'

      if (!isExtends) {
        this.setState({ images: [] })
      }

      let number = 0
      const resources = event.target.files || {}
      const maxLength = event.target.maxLength || false
      let resourcesValues = _.values(resources)
      resourcesValues.map(function (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          number = number + 1
          let newImages = [
            ...this.state.images,
            { file, imageUrl: e.target.result, thumbnailUrl: e.target.result, tags }
          ]
          if (maxLength && maxLength !== -1) {
            console.log(maxLength)
            this.setState({ images: newImages.slice(0, maxLength) })
          } else {
            this.setState({ images: newImages })
          }
          if (this.props.propChange) {
            this.props.propChange(null, { name, value: this.state.images })
          } else if (!_.isEmpty(this.props.input)) {
            this.props.input.onChange(this.state.images)
          }
        }
        return reader.readAsDataURL(file)
      })
    };
    render () {
      const {
        name,
        label,
        className,
        imageClassName,
        style,
        multiple,
        accept,
        image,
        maxLength,
        staticImage,
        basic,
        placeholder
      } = this.props
      const { images } = this.state
      return basic ? (
        <Fragment>
          <div> {placeholder}</div>
          <input
            name={name}
            className={[ 'initInputFile', className ].join(' ')}
            style={style}
            maxLength={maxLength}
            onChange={this.handleOnChange}
            type='file'
            multiple={multiple}
            accept={accept}
          />
        </Fragment>
      ) : (
        <div className={[ s.input, className ].join(' ')} style={{ ...style }}>
          <label htmlFor={name}>{label || name}</label>
          <input
            name={name}
            className='initInputFile'
            maxLength={maxLength}
            onChange={this.handleOnChange}
            type='file'
            multiple={multiple}
            accept={accept}
          />
          <img
            className={imageClassName}
            alt='name'
            src={staticImage || (images[0] ? images[0].imageUrl : image.imageUrl)}
          />
        </div>
      )
    }
}

export default InputImage
