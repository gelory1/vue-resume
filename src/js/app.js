let app = new Vue({
    el: '#app',
    data: {
        loginStaus: false,
        loginBox: false,
        registerBox: false,
        login: {
           account: '',
           password: ''
        },
        register: {
            account: '',
            password: ''
        },
        user: {
            objectId: '',
            email: ''
        },
        resume: {
            name: '耿朋',
            birthday: '1990',
            gender: '男',
            degree: '学士',
            job: '前端工程师',
            email: '917589697@qq.com',
            phone: '18530852241',
            skills: [
                {name: '请添加技能名称',description: '技能描述'},
                {name: '请添加技能名称',description: '技能描述'},
                {name: '请添加技能名称',description: '技能描述'},
                {name: '请添加技能名称',description: '技能描述'},
                {name: '请添加技能名称',description: '技能描述'},
                {name: '请添加技能名称',description: '技能描述'}
            ],
            projects: [
                {name: '请填写项目名称',link: 'http://...',keywords: '请填写关键词',description: '请详细描述'},
                {name: '请填写项目名称',link: 'http://...',keywords: '请填写关键词',description: '请详细描述'}
            ]
        }
    },
    methods: {
        resetData(){
            this.resume = {
                name: '耿朋',
                birthday: '1990',
                gender: '男',
                degree: '学士',
                job: '前端工程师',
                email: '917589697@qq.com',
                phone: '18530852241',
                skills: [
                    {name: '请添加技能名称',description: '技能描述'},
                    {name: '请添加技能名称',description: '技能描述'},
                    {name: '请添加技能名称',description: '技能描述'},
                    {name: '请添加技能名称',description: '技能描述'},
                    {name: '请添加技能名称',description: '技能描述'},
                    {name: '请添加技能名称',description: '技能描述'}
                ],
                projects: [
                    {name: '请填写项目名称',link: 'http://...',keywords: '请填写关键词',description: '请详细描述'},
                    {name: '请填写项目名称',link: 'http://...',keywords: '请填写关键词',description: '请详细描述'}
                ]
            }
            this.login = {
                account: '',
                password: ''
            }
            this.register = {
                account: '',
                password: ''
            }
        },
        logout(){
            AV.User.logOut();
            alert('注销成功')
            this.loginStaus = false
            this.resetData()
        },
        submitLogin(){
            AV.User.logIn(this.login.account, this.login.password).then((user)=> {
                alert('登录成功')
                this.closeLogin()
                let currentUser = user.toJSON()
                Object.assign(this.user,currentUser)
                app.getResume()
                this.loginStaus = true


            }, function (error) {
                if(error.code === 211){
                    alert('用户名/邮箱不存在')
                }else if(error.code === 210){
                    alert('密码不正确')
                }
            });
        },
        submitRegister(){
            // 新建 AVUser 对象实例
            let user = new AV.User()
            // 设置用户名
            user.setUsername(this.register.account)
            // 设置密码
            user.setPassword(this.register.password)
            // 设置邮箱
            user.setEmail(this.register.account)
            user.signUp().then((user)=>{
                let currentUser = user.toJSON()
                Object.assign(this.user,currentUser)
                this.registerBox = false
                this.loginStaus = true
                alert('注册成功')

            }, function (error) {
                alert(error.rawMessage)
            })
        },
        onClickSave(){
            let user = AV.User.current()
            if(user){
                this.saveResume()
            }else{
                this.loginBox = true
            }
        },
        saveResume(){
            let user = AV.Object.createWithoutData('User', this.user.objectId)
            user.set('resume',this.resume)
            user.save()
            alert('保存成功')
        },
        jumpLogin(){
            this.registerBox = false
            this.loginBox = true
        },
        jumpRegister(){
            this.registerBox = true
            this.loginBox = false
        },
        closeLogin(){
            this.loginBox = false
        },
        closeRegister(){
            this.registerBox = false
        },
        updateData(key, value){
            let reg = /\[(\d+)\]/g
            key = key.replace(reg,(match,number)=>{
                return '.'+ number
            })
            let arr = key.split('.')
            console.log(arr);
            let result = this.resume
            for(let i = 0;i<arr.length;i++){
                if(i === arr.length -1){
                    result[arr[i]] = value
                }else{
                    result = result[arr[i]]
                    //第一项是skills
                    //第二项是index
                    //第三项是name、description
                }
            }
        },
        getResume(){
            let query = new AV.Query('User');
            query.get(this.user.objectId).then( (user)=> {
                Object.assign(this.resume,user.toJSON().resume)
                console.log(this.resume)
            }, function (error) {
                // 异常处理
            });
        },
        addSkills(){
            this.resume.skills.push({name: '请添加技能名称',description: '技能描述'})
        },
        removeSkills(index){
            this.resume.skills.splice(index,1)
        },
        addProjects(){
            this.resume.projects.push({name: '请填写项目名称',link: 'http://...',keywords: '请填写关键词',description: '请详细描述'})
        },
        removeProjects(index){
            this.resume.projects.splice(index,1)
        }
    }
});

let user = AV.User.current();
if(user){
    app.user = user.toJSON()
    app.getResume()
    app.loginStaus = true
}else{
    app.loginStaus = false
}