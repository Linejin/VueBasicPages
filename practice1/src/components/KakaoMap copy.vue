<template>
  <div id="map" :style="{ width: width, height: height }"></div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  /* global kakao */
  name: "KakaoMap",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "400px",
    },
  },
  setup() {
    const loading = ref(false);

    async function loadMap() {
      const container = document.getElementById("map");
      const location = await fetchData();
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        markers: null,
        gridSize: 35,
        averageCenter: true,
        minLevel: 6,
        disableClickZoom: true,
        styles: [
          {
            width: "53px",
            height: "52px",
            background: "url(cluster.png) no-repeat",
            color: "#fff",
            textAlign: "center",
            lineHeight: "54px",
          },
        ],
      });
      setMarker(map, clusterer);
      kakao.maps.event.addListener(map, "dragend", async () => {
        setMarker(map, clusterer);
        const position = map.getCenter();
        await updateData(position.getLat(), position.getLng());
      });
    }
    function loadScript() {
      loading.value = false;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&autoload=false&libraries=clusterer`;
      document.head.appendChild(script);
      script.onload = () => kakao.maps.load(loadMap);
    }
    function setMarker(map, clusterer) {
      const position = map.getCenter();
      const marker = new kakao.maps.Marker({
        position: position,
      });
      clusterer.removeMarkers(clusterer.getMarkers());
      clusterer.addMarker(marker);
    }
    async function fetchData() {
      return await axios
        .get("http://127.0.0.1:8000/api/map/marker/1/")
        .then((response) => {
          return {
            latitude: response.data.latitude,
            longitude: response.data.longitude,
          };
        })
        .catch(() => {
          return null;
        });
    }
    async function updateData(latitude, longitude) {
      const data = { latitude: latitude, longitude: longitude };
      return await axios
        .put("http://127.0.0.1:8000/api/map/marker/1/", data)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
    onMounted(() => {
      try {
        if (window.kakao && window.kakao.maps) {
          loadMap();
        } else {
          loadScript();
        }
      } catch (error) {
        console.log(error);
      }
    });
    return {};
  },
};
</script>

<style scoped></style>
