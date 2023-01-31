<template>
     <div  class="subsection-elements" @click="select">
          <h3>
          {{ element }}
        </h3>
        <div v-if="indexElement==selectedElement" class="subsection-elements-action-buttons">
          <circle-button :size="2.2"
            v-if="editing">
            <Icon
              icon="ic:baseline-edit"
              width="25"
              color="var(--primary-color)" /> </circle-button
        >
        <circle-button :size="2.2"
            @click="$emit('removeElement')"
            v-if="editing">
            <Icon
              icon="ic:baseline-delete"
              width="25"
              color="var(--primary-color)" /> </circle-button
        >
        </div>
        </div>
</template>

<script lang="ts">
import CircleButton from "../../shared/Button/CircleButton.vue";
import {Icon} from "@iconify/vue";

export default {
    props:{
        editing:{
            type:Boolean,
            requerid:true
        },
        element:{
            type:String,
            requerid:true
        },
        indexElement:{
            type:Number,
            requerid:true
        },
        selectedElement:{
            type:Number
        }
    },
    components:{CircleButton,Icon},
    setup () {
        

        return {}
    },
    methods:{
        select(){
            this.$emit('selectElement')
        }
    }
}
</script>

<style>
.subsection-elements{
  display: flex;
  justify-content: space-between;
}
.subsection-elements-action-buttons{
  display: flex;
  align-items: center;
}
</style>