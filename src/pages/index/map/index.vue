<template>
    <div>
        <map
            id="myMap"
            style="width: 100%; height: 100vh;"
            :latitude="latitude"
            :longitude="longitude"
            :markers="markers"
            show-location
            @click="handleClickMap"
        >
            <cover-view
                class="top"
                v-bind:style="{ top: top + 'px', height:height+'px', lineHeight:height+'px' }"
            >
                <navigator open-type="navigateBack" style="float:left;padding:0 10px;height:30px;">
                    <i-icon type="return" size="20" color="#999999" />
                </navigator>地理位置
            </cover-view>
        </map>
    </div>
</template>
<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
export default {
    mixins: [calcCapsulePosi],
    data() {
        return {
            latitude: null,
            longitude: null,
            markers: []
        }
    },
    onLoad(query = {}) {
        const { latitude, longitude } = query
        this.latitude = latitude
        this.longitude = longitude
        this.markers = [
            {
                id: 1,
                latitude,
                longitude
            }
        ]
    }
}
</script>

<style lang="less" scoped>
.top {
    background: #fff;
    text-align: center;
    color: #999;
    position: absolute;
    font-size: 14px;
    width: 100%;
}
</style>