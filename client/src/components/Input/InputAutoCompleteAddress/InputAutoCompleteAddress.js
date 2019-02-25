import React, { Component } from 'react'
import { Input, Segment, Form } from 'semantic-ui-react'
import s from './InputAutoCompleteAddress.module.css'
import _ from 'lodash'

const AUTOCOMPLETE_ID = 'inputAutocomplete'
const InputMap = AUTOCOMPLETE_ID + 'Map'

// const DEFAULT_LAT = -33.8617374;
// const DEFAULT_LNG = 151.2021291;
class InputAutocompleteAddress extends Component {
    state = {};
    myAuto = React.createRef();

    componentDidMount () {
      const { uniqueId = '' } = this.props
      // console.log(window.google);
      if (window.google) {
        this.addressAutoComplete(uniqueId)
        // this.serviceAutoComplete();
        // const location = this.props.location || {lat:DEFAULT_LAT,lng:DEFAULT_LNG};
        // this.initMap(uniqueId, location);
      }
    }

    componentDidUpdate (prevProps) {
      const { value } = this.props
      if (prevProps.value !== value) {
        this.setState({ stateValue: value })
      }
    }
    initMap = (uniqueId, location = {}) => {
      const mapCenter = new window.google.maps.LatLng(location.lat, location.lng)
      const map = new window.google.maps.Map(document.getElementById(InputMap + uniqueId), {
        center: mapCenter,
        zoom: 15
      })
      const placeService = new window.google.maps.places.PlacesService(map)
      this.setState({ placeService })
    };

    addressAutoComplete = (uniqueId) => {
      // let {autocomplete} = this.state;
      const { input = {}, onChange, name } = this.props
      const autocomplete = new window.google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        document.getElementById(AUTOCOMPLETE_ID + uniqueId),
        { types: [ 'geocode' ] }
      )
      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', function () {
        let place = autocomplete.getPlace()
        if (place.geometry) {
          // propsOnChange({}, { name: 'lat', value: place.geometry.location.lat() });
          // propsOnChange({}, { name: 'lng', value: place.geometry.location.lng() });
          // propsOnChange({}, { name: 'city', value: place.vicinity });
          if (!_.isEmpty(input)) {
            input.onChange(place.formatted_address)
          } else {
            onChange(null, { name, value: place.formatted_address })
            onChange(null, { name: 'place', value: place })
          }
          // document.getElementById(AUTOCOMPLETE_ID).value = place.formatted_address;
        }
      })
    };
    serviceAutoComplete = () => {
      const service = new window.google.maps.places.AutocompleteService()
      this.setState({ service })
    };

    handleOnChange = (event, data) => {
      if (!_.isEmpty(this.props.input)) {
        this.props.input.onChange(event.target.value)
      } else {
        this.props.onChange(event, { name: this.props.name, value: data.value })
      }
    };
    render () {
      const { value, uniqueId = '', input = {}, isForm, meta = {}, ...rest } = this.props
      const { error, touched } = meta
      const { onChange, ...restInput } = input
      return (
        <div>
          <div id={InputMap + uniqueId} style={{ display: 'none' }} />

          <Form.Input
            as={isForm ? null : Input}
            id={AUTOCOMPLETE_ID + uniqueId}
            className={s.input}
            fluid
            onChange={this.handleOnChange}
            {...restInput}
            {...rest}
          />

          {touched &&
                !_.isEmpty(error) && (
                <Segment compact style={{ float: 'right' }}>
              {error}
            </Segment>
          )}
        </div>
      )
    }
}

export default InputAutocompleteAddress
