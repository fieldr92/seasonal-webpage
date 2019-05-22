import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

const App = () => {
  const [lat, setLat] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const renderContent = () => {
    if (errorMessage && !lat) {
      return <div>Error: {errorMessage}</div>;
    }
    if (!errorMessage && lat) {
      return <SeasonDisplay lat={lat} />;
    }
    return <Spinner message="Please accept location request..." />;
  };

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setLat(position.coords.latitude),
      err => setErrorMessage(err.message)
    );
  }, []);

  return <div className="border red">{renderContent()}</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
