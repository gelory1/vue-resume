Vue.component('resume',{
    props: ['previewvis','resume'],
    template: `
    <main>
        <div class="resumeWrapper">
            <section class="header">
                <div class="resumeHeader">
                    <h1>个人简历</h1>
                </div>
                <div class="line"></div>
                <h1>
                    <edit-span :value="resume.name" :disabled="previewvis === true" @update="updateData('name',$event)"></edit-span>
                </h1>

                <p>应聘职位：<edit-span v-bind:value="resume.job" :disabled="previewvis === true" v-on:update="updateData('job',$event)"></edit-span></p>
                <p>
                    <edit-span v-bind:value="resume.birthday" :disabled="previewvis === true" v-on:update="updateData('birthday',$event)"></edit-span>
                    |
                    <edit-span v-bind:value="resume.gender" :disabled="previewvis === true" v-on:update="updateData('gender',$event)"></edit-span>
                    |
                    <edit-span v-bind:value="resume.degree" :disabled="previewvis === true" v-on:update="updateData('degree',$event)"></edit-span>
                    |
                    <edit-span v-bind:value="resume.email" :disabled="previewvis === true" v-on:update="updateData('email',$event)"></edit-span>
                    |
                    <edit-span v-bind:value="resume.phone" :disabled="previewvis === true" v-on:update="updateData('phone',$event)"></edit-span>
                </p>
            </section>
            <section class="skills">
                <h2>技能</h2>
                <ul>
                    <li v-for="skill,index in resume.skills">
                        <edit-span :value="skill.name" :disabled="previewvis === true" @update="updateData('skills['+index+'].name',$event)"></edit-span>
                        <div class="description">
                            <edit-span :value="skill.description" :disabled="previewvis === true" @update="updateData('skills['+index+'].description',$event)"></edit-span>
                        </div>
                        <div class="close" v-if="index >= 6" @click="removeSkills(index)" v-show="!previewvis" class="close">x</div>
                    </li>
                    <li v-show="!previewvis" class="addSkills">
                        <span @click="addSkills">添加技能</span>
                        <div @click="addSkills">+</div>
                    </li>
                </ul>
            </section>
            <section class="items">
                <h2>项目经历</h2>
                <ol>
                    <li v-for="project,index in resume.projects">
                        <h3>
                            <edit-span :value="project.name" :disabled="previewvis === true" @update="updateData('projects['+ index +'].name',$event)"></edit-span>
                        </h3>
                        <edit-span :value="project.link" :disabled="previewvis === true" @update="updateData('projects['+index+'].link',$event)"></edit-span>
                        <p>
                            <edit-span :value="project.keywords" :disabled="previewvis === true" @update="updateData('projects['+index+'].keywords',$event)"></edit-span>
                        </p>
                        <p>
                            <edit-span :value="project.description" :disabled="previewvis === true" @update="updateData('projects['+index+'].description',$event)"></edit-span>
                        </p>
                        <div class="close" v-if="index >= 2" @click="removeProjects(index)" v-show="!previewvis" class="close">x</div>
                    </li>
                    <li v-show="!previewvis" class="addProjects">
                        <span @click="addProjects">添加项目</span>
                        <div @click="addProjects">+</div>
                    </li>
                </ol>
            </section>
        </div>
    </main>
    `,
    methods:{
        removeSkills(index){
            this.resume.skills.splice(index,1)
        },
        removeProjects(index){
            this.resume.projects.splice(index,1)
        },
        addSkills(){
            this.resume.skills.push({name: '请添加技能名称',description: '技能描述'})
        },
        addProjects(){
            this.resume.projects.push({name: '请填写项目名称',link: 'http://...',keywords: '请填写关键词',description: '请详细描述'})
        },
        updateData(key, value){
            let reg = /\[(\d+)\]/g;
            key = key.replace(reg,(match,number)=>{
                return '.'+ number
            });
            let arr = key.split('.');
            let result = this.resume;
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
    }
})
