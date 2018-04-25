<template>
    <div>
      <p>{{moni}}</p>
    </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            
        }
    },
    computed:{
        ...mapActions({
            data(store){
                return store.moni
            }
        })        
    }
}
</script>

