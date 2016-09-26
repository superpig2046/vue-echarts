<template>
    <div class="raw-chart-content" ></div>
</template>


<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts'

    let RawChart = {
        created(){
            console.log('created');
            this.$options.template = `<div class="raw-chart-content" id="${this.localId}"></div>`;
        },
        ready(){
            this.chartInstance = echarts.init(document.getElementById(this.localId));
            if (this.options.series === undefined){
                this.chartInstance.setOption({xAxis: {},yAxis: {},series: []});
            }else{
                this.chartInstance.setOption(this.options);
            }
            console.log('ready')
        },
        watch: {
            'options': {
                handler: function(val, oldVal){
                    this.chartInstance.setOption(this.options);
                },
                deep: true
            },
            'loading': function(val, oldVal){
                console.log('loading changed', val);
                if (val){
                    this.chartInstance.showLoading(this.loadingOptions);
                }else{
                    this.chartInstance.hideLoading();
                }
            }
        },
        props:{
            options: {type: Object, default: () => {return {xAxis: {},yAxis: {},series: []}}},
            loading: {type: Boolean, default: false},
            loadingText: {type: String, default: '加载中,请稍后...'},
            loadingStyle: {type: Object, default: () => {
                return {color: '#c23531',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.8)',
                    zlevel: 0}}}
        },
        computed:{
            loadingOptions: function(){
                let newStyle = Object.assign({}, this.loadingStyle);
                newStyle.text = this.loadingText;
                return newStyle
            }
        },
        data: () =>{
            return{
                localId: 'Chart_'+parseInt(Math.random()*10000),
                chartInstance: null
            }
        },
    };

    export default RawChart

</script>

<style>
    .raw-chart-content{
        width: 100%;
        height: 100%;
    }
</style>