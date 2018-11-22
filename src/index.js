import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  state = { lat: null,  errorMessage: '' }

  componentDidMount() { // called automatically when the component is first mounted
    console.log('My component was rendered to the screen');
    window.navigator.geolocation.getCurrentPosition( // two arguments are both CALLBACKS and thus make this function asnychronous
      position => this.setState({ lat: position.coords.latitude }), // ALWAYS USE this.setState to set the state of a component // NEVER USE ASSIGNMENT
      err => this.setState({ errorMessage: err.message })
    );
  }

  componentDidUpdate() { // called automatically each time the component is updated
    console.log('My component was just updated - it rerendered!');
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <Spinner message="Please accept location request..." />
  }

  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)