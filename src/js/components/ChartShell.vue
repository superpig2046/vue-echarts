<template>
    <raw-chart
            :loading="loading"
            :options="styledOptions"
            :loading-text="loadingText"
            :loading-style="loadingStyle"
            :frame-theme="frameTheme"></raw-chart>
</template>

<script>
    import RawChart from './RawChart.vue'
    import FrameThemeContainer from '../style/FrameTheme'

    const frameThemeInstance = new FrameThemeContainer();

    let ChartShell = {
        props:{
            options: {type: Object, default: () => {return {xAxis: {},yAxis: {},series: []}}},
            loading: {type: Boolean, default: false},
            loadingText: {type: String, default: '加载中,请稍后...'},
            loadingStyle: {type: Object, default: () => {
                return {color: '#c23531',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.8)',
                    zlevel: 0}}},
            frameTheme: {type: String, default: 'normal'}
        },
        computed: {
            styledOptions: function(){
                console.log(this.options);
                return this.options
            }
        },
        components:{
            RawChart
        }
    };

    export default ChartShell

</script>