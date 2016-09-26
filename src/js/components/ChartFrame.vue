<template>
    <div class="chart-frame"
         :style="{backgroundColor: frameBackGround, height: frameHeight, width: frameWidth}">
        <div class="chart-frame-title" :style="frameTitleText.mainText" v-if="haveTitle">
            {{ frameTitle }}
            <small :style="frameTitleText.subText">{{ subFrameTitle }}</small>
        </div>
        <div class="chart-frame-body" :style="frameBody">
            <slot name="content"></slot>
        </div>

    </div>
</template>


<script>
    import FrameThemeContainer from '../style/FrameTheme'

    const frameThemeInstance = new FrameThemeContainer();


    let ChartFrame = {
        props:{
            frameWidget: {type: Object, default: () => {
                return {}
            }},
            frameTitle: {type: String, default: '默认标题'},
            subFrameTitle: {type: String, default: '副标题'},
            haveTitle: {type: Boolean, default: true},
            frameTheme: {type: String, default: 'normal'}
        },
        computed: {
            frameBackGround: function(){
                return this.frameWidget.backgroundColor || frameThemeInstance.style(this.frameTheme).backgroundColor
            },
            frameWidth: function(){
                console.log(this.frameWidget.width || '100%');
                return this.frameWidget.width+'px' || '100%'
            },
            frameHeight: function(){
                return this.frameWidget.height+'px' || 'auto'
            },
            frameTitleText: function(){
                return {
                    mainText: {
                        color: frameThemeInstance.style(this.frameTheme).mainTextColor,
                        borderBottom: frameThemeInstance.style(this.frameTheme).titleBorder
                    },
                    subText: {color: frameThemeInstance.style(this.frameTheme).subTextColor, marginLeft: '10px'}
                }
            },
            frameBody: function(){
                if (this.haveTitle){
                    return {
                        width: (this.frameWidget.width - 20) + 'px',
                        height: (this.frameWidget.height - 40) + 'px'
                    }
                }else{
                    return {
                        width: (this.frameWidget.width - 20) + 'px',
                        height: (this.frameWidget.height - 10) + 'px'
                    }
                }

            }

        }
    };

    export default ChartFrame

</script>


<style>
    .chart-frame{
        padding: 5px 0;
        box-shadow: 0 0 3px rgba(0,0,0,0.3);
        border-radius: 4px;
        display: inline-block;
        float: left;
    }

    .chart-frame .chart-frame-title{
        padding: 5px 10px;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
    }

    .chart-frame .chart-frame-body{
        padding: 5px 10px;
    }
</style>