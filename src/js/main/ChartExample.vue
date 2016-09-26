
<template>

    <!--button @click="handleSwitchLoading">Switch Loading</button>
    <div style="height: 400px;width: 600px;background-color: rgba(0,0,0,0.05)">
        <raw-chart :loading="loading" :options="option"></raw-chart>
    </div-->
    <chart-frame
            :frame-widget="frameWidget" :have-title="haveTitle" :frame-theme="frameTheme">
        <chart-shell :loading="loading" :options="option" slot="content"></chart-shell>
    </chart-frame>
</template>

<script>
    import ChartShell from '../components/ChartShell.vue'
    import ChartFrame from '../components/ChartFrame.vue'

    let ChartExample = {
        data: () => {
            return {
                loading: false,
                option: {
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                },
                frameWidget: {width: 600, height: 400},
                haveTitle: true,
                frameTheme: 'dark'
            }
        },
        methods: {
            handleSwitchLoading: function(){
                console.log('request to switch loading');
                this.loading = true;
                setTimeout(() => {
                    this.option.series[0]['data'] = [25, 10, 26, 30, 5, 25];
                    this.loading = false;
                }, 2000)
            }
        },
        components: {
            ChartFrame, ChartShell
        }
    };

    export default ChartExample
</script>