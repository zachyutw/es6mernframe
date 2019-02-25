import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';
import s from './ButtonPushBGColor.module.css';
import sass from './ButtonC.module.scss';
import _ from 'lodash';
const styles = {
    selected: {}
};
const linearBG = (length, color, selected, selectedColor) => {
    return _.times(
        length,
        (n) =>
            ` ${selected === n ? selectedColor : color} ${Math.floor(n * 100 / length)}% ${Math.floor(
                (n + 1) * 100 / length
            )}%`
    ).join(',');
};
class ButtonPushBGColorGroup extends PureComponent {
    state = { selected: 0, isToRight: false, selectedCss: 0 };
    componentDidUpdate (prevProps, prevState) {
        if (prevState.selected !== this.state.selected) {
            this.setState({ isToRight: prevState.selected < this.state.selected });
        }
    }

    getSelected = (selected) => {
        this.setState({ selected });
    };

    render () {
        const { fields = [] } = this.props;
        const { selected, isToRight } = this.state;

        return (
            <Button.Group
                widths={fields.length}
                className={s.btnGroup}
                // style={{
                // 	backgroundColor: '#FFF',
                // 	background: `linear-gradient( to right, ${linearBG(fields.length, 'white', selected, 'blue')}  )`,
                // 	transition: 'all 5s ease'
                // }}
            >
                {fields.map((field = {}, index) => (
                    <ButtonC
                        key={index}
                        id={index}
                        {...field}
                        onClick={this.getSelected}
                        className={[
                            s.btn,
                            field.className,
                            isToRight && selected === index ? s.rightBtn : '',
                            selected === index ? s.selected : ''
                        ].join(' ')}
                        style={{ ...field.style, ...styles.selected }}
                    />
                ))}
            </Button.Group>
        );
    }
}

class ButtonC extends PureComponent {
    state = {};
    static Group = ButtonPushBGColorGroup;
    handleOnClick = () => {
        this.props.onClick(this.props.id);
    };
    render () {
        const { value, className, style } = this.props;
        return (
            <Button className={sass.btn} style={style} onClick={this.handleOnClick}>
                {value}
            </Button>
        );
    }
}

export default ButtonC;
