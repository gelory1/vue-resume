Vue.component('app-aside',{
    props:['previewvis','loginsta'],
    template: `
        <aside>
        <div class="signInButtons">
            <button @click="onClickSave" v-if="!previewvis">保存</button>
            <button @click="onClickShare" v-if="!previewvis">分享</button>
            <button @click="onClickPrint">打印</button>
            <router-link to="/theme" v-if="!previewvis" @click="onClickTheme">换肤</router-link>
            <button v-if="previewvis" @click="exitShare">退出预览</button>
        </div>
        <div class="signOutButton" v-if="!previewvis" v-cloak>
            <button v-if="loginsta" @click="logout">登出</button>
            <router-link to="/register" v-if="!loginsta">注册</router-link>
            <router-link to="/login" v-if="!loginsta"">登录</router-link>
        </div>
    </aside>
    `,
    data(){
        return {

        }
    },
    methods:{
        onClickSave(){
            let user = AV.User.current();
            if(user){
                this.$emit('save-resume')
            }else{
                location.hash = '#/login'
            }
        },
        onClickShare(){
            let user = AV.User.current();
            if(user){
                location.hash = '#/share'
            }else{
                location.hash = '#/login'
            }
        },
        onClickTheme(){
            this.$emit('open-theme')
        },
        exitShare(){
            let reloadUrl = location.origin + location.pathname;
            location.replace(reloadUrl);
            this.previewvis = false;
            this.$emit('render')
        },
        logout(){
            AV.User.logOut();
            alert('注销成功');

            this.$emit('logout')
        },
        onClickPrint(){
            window.print()
        }
    }
})
