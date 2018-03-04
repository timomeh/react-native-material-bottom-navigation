import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

export default class PressFeedback extends React.Component {
  state = {
    presses: []
  }

  addFeedbackIn = () => {
    // TODO
  }

  enqueueFeedbackOut = () => {
    // TODO
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.addFeedbackIn, this.enqueueFeedbackOut)}
      </React.Fragment>
    )
  }
}
