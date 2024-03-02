import { Box } from '@chakra-ui/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'

const containerStyle = {
  width: '100%',
  height: '100%',
  margin: '0 auto',
}

function GoogleMaps({ location }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <Box
      w={['280px', 'sm', 'lg', 'xl']}
      h="300px"
      border="2px solid"
      borderColor="primary.500"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={location} />
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </Box>
  ) : (
    <></>
  )
}

export default React.memo(GoogleMaps)
