<template>
    <div id="map" :style="{ width: width, height: height }">
    </div>
</template>

<script>
import {ref} from "vue"
import axios from 'axios'
export default ({
    /* global kakao */
    name: "KakaoMap",
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '400px'
        }
    },
    data(){
    },
    setup(){
        return{
        }
    },
    mounted(){
        try{
            if(window.kakao && window.kakao.maps){
                this.loadMap();
            } else {
                this.loadScript();
            }
        }catch(error){
            console.log(error);
        }
    },
    methods: {
        async loadMap(){
            /* global map */
            const container = document.getElementById("map");
            const location = await this.fetchData();
            const options = {
                center: new kakao.maps.LatLng(location.latitude, location.longitude),
                level: 3,
            };
            map.value = new kakao.maps.Map(container, options);
            var clusterer = new kakao.maps.MarkerClusterer({
                map: map.value,
                markers: this.markers,
                gridSize: 35,
                averageCenter: true,
                minLevel: 6,
                disableClickZoom: true,
                styles: [{
                    width : '53px', height : '52px',
                    background: 'url(cluster.png) no-repeat',
                    color: '#fff',
                    textAlign: 'center',
                    lineHeight: '54px'
                }]
            });
            this.setMarker(clusterer);
            kakao.maps.event.addListener(map.value, 'dragend', async () => {
                this.setMarker(clusterer);
                var position = map.value.getCenter();
                await this.updateData(position.getLat(), position.getLng());
            });
        },
        loadScript(){
            this.loading = false;
            const script = document.createElement("script");
            script.type = "text/javascript";
            const key = process.env.VUE_APP_KAKAO_API_KEY;
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=clusterer";
            document.head.appendChild(script);
            script.onload = () => kakao.maps.load(this.loadMap);
        },
        setMarker(clusterer){
            var position = map.value.getCenter();
            var marker = new kakao.maps.Marker({
                position: position
            });
            clusterer.removeMarkers(clusterer.getMarkers());
            clusterer.addMarker(marker);
        },
        async fetchData(){
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/map/marker/1/');
                return {"latitude": response.data.latitude, "longitude": response.data.longitude};
            } catch (error) {
                return null;
            }
        },
        async updateData(latitude, longitude){
            try {
                const data = {"latitude": latitude, "longitude": longitude};
                const response = await axios.put('http://127.0.0.1:8000/api/map/marker/1/', data);
                return true;
            } catch (error) {
                return false;
            }
        }
    },
})
</script>

<style scoped>

</style>