import React from 'react';
import Destination from '../Destination/';

const Destinations = ({ destinations, removeDestination }) => (
  <div>
    <h2>Destinations</h2>

    <ul>
      {
        destinations.map(({destination, duration}) => 
          <Destination
            destination={destination}
            duration={duration}
            removeDestination={removeDestination}
            key={`${destination.destination}-${destination.duration}`}
          />
        )
      }
    </ul>
  </div>
);

export default Destinations;
