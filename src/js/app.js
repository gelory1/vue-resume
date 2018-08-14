let app = new Vue({
    el: '#app',
    data: {
        shareVisible: false,
        previewVisible: false,
        loginStatus: false,
        loginBox: false,
        registerBox: false,
        themeVisible:false,
        mainClass: 'default',
        shareLink: '',
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
                {name: '请添加技能名称', description: '技能描述'},
                {name: '请添加技能名称', description: '技能描述'},
                {name: '请添加技能名称', description: '技能描述'},
                {name: '请添加技能名称', description: '技能描述'},
                {name: '请添加技能名称', description: '技能描述'},
                {name: '请添加技能名称', description: '技能描述'}
            ],
            projects: [
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'}
            ]
        }
    },
    methods: {
        resetData(){
            this.loginStatus = false
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
        },
        submitLogin(user){
                this.loginBox = false
                let currentUser = user.toJSON();
                Object.assign(this.user,currentUser);
                this.loginStatus = true;
                if(userId){
                    this.getResume({objectId:userId});
                    this.previewVisible = true
                }else{
                    this.getResume(this.user);
                    this.previewVisible = false
                }
        },
        submitRegister(user){
            let currentUser = user.toJSON();
            Object.assign(this.user,currentUser);
            this.loginStatus = true;
        },
        saveResume(){
            let user = AV.Object.createWithoutData('User', this.user.objectId);
            user.set('resume',this.resume);
            user.save();
            alert('保存成功')
        },
        closeLogin(){
            this.loginBox = false
        },
        closeRegister(){
            this.registerBox = false
        },
        getResume(currentus){
            let query = new AV.Query('User');
            query.get(currentus.objectId).then( (user)=> {
                Object.assign(this.resume,user.toJSON().resume)
            }, function (error) {
                // 异常处理
            });
        },
        setTheme(name){
            this.mainClass = name
            this.themeVisible = false
        }
    }
});
let user = AV.User.current();
if(user){
    app.user = user.toJSON();
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.user.objectId;
    app.loginStatus = true;
    app.getResume(app.user)
}
let search = location.search;
let reg = /user_id=([^&]+)/;
let matches = search.match(reg);
let userId;
if(matches){
    userId = matches[1];
    app.getResume({objectId: userId});
    app.previewVisible = true

}else{
    app.previewVisible = false;
}

