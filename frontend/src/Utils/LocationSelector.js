//LocationSelector.js
import React, { useEffect, useRef } from 'react';
import Events from '../Events';

const LocationSelector = ({onChange}) => {
  const locationInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps Places API
    loadPlacesAPI(initAutocomplete);
  }, []);

  const loadPlacesAPI = (callback) => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB_814ARW1IuguIKitZZZaqJeBYX5X2a_Q&libraries=places';
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  };

  const initAutocomplete = () => {
    const locationInput = locationInputRef.current;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(locationInput);
  
    // Add an event listener for when the user selects a location
    autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
  };
  

  const handlePlaceSelect = () => {
    // Handle the selected location when the user selects a place from the Autocomplete dropdown
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) {
      console.log("No location data available for this input.");
      return;
    }

    // Log the selected location data
    console.log("Selected Location:", place.name);
    console.log("Latitude:", place.geometry.location.lat());
    console.log("Longitude:", place.geometry.location.lng());

    // Call the onChange prop with the selected location data
    if (onChange) {
      onChange({
        location: place.name,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      });
    }
  };
  

  // Prevent form submission on Enter key press inside the input
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
   
      <input
        type="text"
        ref={locationInputRef}
        className="form-control"
        placeholder="Enter location"
        onKeyDown={handleKeyDown}
      />
    
  );
};

export default LocationSelector;
