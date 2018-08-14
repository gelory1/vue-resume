Vue.component('theme',{
    template: `
    <div class="themeBox">
        <div class="theme">
            <button @click="setTheme('default')">默认主题</button>
            <button @click="setTheme('black')">暗黑主题</button>
        </div>
    </div>
    `,
    methods: {
        setTheme(name){
            this.$emit('themechange',name)
        }
    }
})
