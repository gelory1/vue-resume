Vue.component('register',{
    template: `
        <div class="registerBox" v-cloak>
        <form class="register" @submit.prevent="submitRegister">
            <h3>注册</h3>
            <div>
                <label>账号</label>
                <input type="text" v-model="register.account" placeholder="邮箱">
            </div>
            <div>
                <label>密码</label>
                <input type="password" v-model="register.password">
            </div>
            <button type="submit">提交</button>
            <span>已有账号？直接<a href="#" @click="jumpLogin">登录</a></span>
        </form>
        <button class="closeRegister" @click="$emit('close-register')">关闭</button>
    </div>
    `,
    data(){
        return{
            register: {
                account: '',
                password: ''
            },
        }
    },
    methods: {
        jumpLogin(){
            this.$emit('close-register')
            this.$emit('open-login')
        },
        submitRegister(){
            // 新建 AVUser 对象实例
            let user = new AV.User();
            // 设置用户名
            user.setUsername(this.register.account);
            // 设置密码
            user.setPassword(this.register.password);
            // 设置邮箱
            user.setEmail(this.register.account);
            user.signUp().then((user)=>{
                this.$emit('register',user)
                alert('注册成功')
                this.$emit('close-register')
            }, function (error) {
                alert(error.rawMessage)
            })
        }
    }
})