import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'
import s from './InputRichTextEditor.module.css'
export default class InputRichTextEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: RichTextEditor.createEmptyValue(),
      innerHtml: { __html: '' }
    }
  }
    toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: [
        'INLINE_STYLE_BUTTONS',
        'BLOCK_TYPE_BUTTONS',
        'LINK_BUTTONS',
        'BLOCK_TYPE_DROPDOWN',
        'HISTORY_BUTTONS'
      ],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' }
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' }
      ]
    };
    static propTypes = {
      className: PropTypes.string,
      style: PropTypes.object,
      propOnChange: PropTypes.func,
      name: PropTypes.string,
      input: PropTypes.object
    };
    static defaultProps = {
      name: 'innerHtml'
    };

    handleOnChange = (value) => {
      this.setState({ value, innerHtml: { __html: value.toString('html') } })
      if (this.props.input) {
        this.props.input.onChange(value.toString('html'))
      } else if (this.props.onChange) {
        this.props.onChange(null, { name: this.props.name, value: value.toString('html') })
      }
      // console.log(value.toString('html'));
    };

    render () {
      const { placeholder } = this.props
      return (
        <div>
          <RichTextEditor
            className={s.input}
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleOnChange}
          />
        </div>
      )
    }
}
