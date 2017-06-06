<template>
  <gmap-map
  :center= "center"
  :zoom="16"
  map-type-id="terrain"
  style="width: 100%; height: 600px"
>
    <gmap-marker
      v-for="l in location"
      :position="l"
      :clickable="true"
      :draggable="false"
      @click="center=l"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        center: {},
        location: []
      }
    },
    created () {
      this.getPosition()
    },
    methods: {
      getPosition () {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.getMarkers(position.coords.latitude, position.coords.longitude)
        })
      },
      getMarkers (lat, lng) {
        axios({
          method: 'get',
          url: 'http://posmed.sytes.net:8081/maps',
          params: {
            lat: lat,
            lng: lng
          }
        }).then(response => {
          response.data.results.forEach(value => {
            this.location.push(value.geometry.location)
          })
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
