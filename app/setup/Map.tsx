'use client'
import { APIProvider, Marker, Map as GMap, MapCameraChangedEvent, MapMouseEvent, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import React, { useState, useEffect } from 'react'
import { Circle } from './circle';



type Coordinations = {
  lat: number
  lng: number
}
type allowedFormValues = "lat" | "lng"

type MapProps = {
  radius: number
  onChangePosition: (key: allowedFormValues, value: string | number) => void
}

const Map = ({ radius, onChangePosition }: MapProps) => {
  const [markers, setMarkers] = useState<Coordinations>({
    lat: 0,
    lng: 0
  });

  const [position, setPosition] = useState<Coordinations>({
    lat: 52.13243345903222,
    lng: 15.2984619140625
  });
  const onMapClick = (e: MapMouseEvent) => {
    setMarkers(
      {
        lat: e.detail.latLng?.lat ?? 0,
        lng: e.detail.latLng?.lng ?? 1,
      }
    )
    onChangePosition("lat", e.detail.latLng?.lat ?? 0)
    onChangePosition("lng", e.detail.latLng?.lng ?? 0)
  };


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
      console.log(position)
    })
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "AIzaSyAnxeUxrz-903WKIQ8N7nAUxLU6WeH70i4"} onLoad={() => console.log('Maps API has loaded.', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)}>
      <GMap
        className='border-none w-[100%] h-[100%]'
        disableDefaultUI={true}
        mapId="739af084373f96fe"
        defaultZoom={3.5}
        defaultCenter={position}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
        onClick={onMapClick}
      >
        {markers?.lat != 0 &&
          <>
            <AdvancedMarker
              position={{
                lat: markers.lat,
                lng: markers.lng,
              }}
            >
              <Pin
                background={"#f31260"}
                borderColor={"#f31260"}
                glyphColor={"#3c4043"}
              ></Pin>
            </AdvancedMarker>
            <Circle center={{ lat: markers.lat, lng: markers.lng }} radius={radius} strokeColor={"red"} />
          </>
        }
      </GMap>
    </APIProvider>
  )
}

export default Map