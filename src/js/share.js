window.Share = {
    props:['sharelink'],
    template: `
        <div class="shareBox"  v-cloak>
        <div class="share">
            <h3>复制以下链接进行分享</h3>
            <label>
                <textarea readonly>{{sharelink}}</textarea>
            </label>
            <span class="close" @click="$emit('close-share')">x</span>
        </div>
    </div>    
    `
}
Vue.component('share',Share);