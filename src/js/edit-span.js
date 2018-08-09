Vue.component('edit-span', {
    props: ['value','disabled'],
    template: `
        <span class="editSpan">
            <span v-show="!editing">{{value}}</span>
            <input v-show="editing" type="text" v-bind:value="value" v-on:input="emitUpdate">
            <button v-on:click="editing = !editing" v-if="!disabled">edit</button>
        </span>
    `,
    data: function(){
        return {
            editing: false
        }
    },
    methods:{
        emitUpdate(e){
            this.$emit('update',e.target.value)
        }
    }
});