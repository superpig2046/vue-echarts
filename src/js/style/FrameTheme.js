/**
 * Created by hanyong336 on 16/9/26.
 */

const NormalStyle = {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    mainTextColor: '#1b1b1b',
    subTextColor: '#888',
    titleBorder: '1px solid #eee'
};


const DarkStyle = {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    mainTextColor: '#eee',
    subTextColor: '#777',
    titleBorder: '1px solid #222'
};


class FrameThemeContainer{
    constructor(){
        this.normal = NormalStyle;
        this.dark = DarkStyle;
    }

    style (text) {
        return this[text] || this.normal
    }
}

export default FrameThemeContainer