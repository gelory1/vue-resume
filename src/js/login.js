window.Login ={
    template: `
    <div class="loginBox" v-cloak>
        <form class="login" @submit.prevent="submitLogin">
            <h3>登录</h3>
            <div>
                <label>账号</label>
                <input type="text" v-model="login.account" placeholder="邮箱">
            </div>
            <div>
                <label>密码</label>
                <input type="password" v-model="login.password">
            </div>
            <button type="submit">提交</button>
            <span>没有账号？点此<router-link to="/register" @click="jumpRegister">注册</router-link></span>
        </form>
        <button class="closeLogin" @click="$emit('close-login')">关闭</button>
    </div>
    `,
        data(){
    return {
        login: {
            account: '',
            password: ''
        }
    }
},
    methods:{
        jumpRegister(){
            this.$emit('close-login')
        },
        submitLogin(){
            AV.User.logIn(this.login.account, this.login.password).then((user)=> {
                alert('登录成功');
                this.$emit('login',user)
            }, function (error) {
                if(error.code === 211){
                    alert('用户名/邮箱不存在')
                }else if(error.code === 210){
                    alert('密码不正确')
                }
            })
        }
    }
}

Vue.component('login',Login);
