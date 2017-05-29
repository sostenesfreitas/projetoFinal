<template>
  <gmap-map
  :center= "center"
  :zoom="17"
  map-type-id="terrain"
  style="width: 100%; height: 600px"
>
    <gmap-marker
      v-for="m in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
  export default {
    data () {
      return {
        center: {lat: -8.1544179, lng: -34.9201405},
        markers: [{
          position: {lat: -8.1524001, lng: -34.920339}
        }, {
          position: {lat: -8.1578802, lng: -34.9147278}
        }]
      }
    }
  }
</script>
