<template>

<div class="container">
    <div class="accordion" id="accordionExample">
    <div class="steps">
        <progress id="progress" :value="progressVal" max="100"></progress>

        <div class="step-item" v-for="step in steps">
            <button @click="updateProgress(step.id)" :class="getStepClass(step.id)" class="step-button text-center" type="button" data-bs-toggle="collapse"
                :data-bs-target="`#${step.dataBsTarget}`" :aria-expanded="step.id === currentStep" :aria-controls="step.dataBsTarget">
                <i class="fas fa-fw" :class="{[step.icon]: true}"></i>
            </button>
            <div class="step-title">
                {{ step.text }}
            </div>
        </div>

        <!-- <div class="step-item">
            <button :class="getStepClass(1)" class="step-button text-center" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <i class="fas fa-fw fa-info"></i>
            </button>
            <div class="step-title">
                Info
            </div>
        </div>
        <div class="step-item">
            <button :class="getStepClass(2)" class="step-button text-center" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-medal"></i>
            </button>
            <div class="step-title">
                Skills
            </div>
        </div>
        <div class="step-item">
            <button :class="getStepClass(3)" class="step-button text-center" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <i class="fas fa-fw fa-check-circle"></i>
            </button>
            <div class="step-title">
                Finish
            </div>
        </div> -->
    </div>
    </div>
</div>

</template>


<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

const emit = defineEmits(['update-step'])

const primaryColor = ref('#007bff')
const secondaryColor = ref('#b1b1b1')

const props = defineProps<{
    currentStep: number
}>()

const progressVal = ref(0)

const steps = ref([
    {
        id: 1,
        text: 'Info',
        icon: 'fa-info',
        dataBsTarget: 'collapseOne',
    },
    {
        id: 2,
        text: 'Skills',
        icon: 'fa-medal',
        dataBsTarget: 'collapseTwo',
    },
    {
        id: 3,
        text: 'Finish',
        icon: 'fa-check-circle',
        dataBsTarget: 'collapseThree',
    }
])

// aria expanded = true if same step


const currentStep = computed( () => props.currentStep)

watch(currentStep, (val: number) => {
    console.log('val', val)
    updateProgress(val)
})

onMounted( () => {
    updateProgress(currentStep.value)

})

const updateProgress = (step: number) => {
    console.log('updateProgress()', step)
    
    console.log('currentStep.value', currentStep.value)

    if(step === 1){
        progressVal.value = 0
    }
    else if(step === 2){
        progressVal.value = 50
    }
    else{
        progressVal.value = 100
    }

    emit('update-step', step)
}


// const updateStep = () => {
//     const stepButtons = document.querySelectorAll('.step-button');
//     const progress = document.querySelector('#progress') as HTMLDivElement;
    
//     Array.from(stepButtons).forEach((button,index) => {
//         button.addEventListener('click', () => {
//             progress.setAttribute('value', (index * 100 /(stepButtons.length - 1)).toString() );//there are 3 buttons. 2 spaces.
    
//             stepButtons.forEach((item, secindex)=>{
//                 if(index > secindex){
//                     item.classList.add('done');
//                 }
//                 if(index < secindex){
//                     item.classList.remove('done');
//                 }
//             })
//         })
//     })
// }

const getStepClass = (thisStep: number) => {
    if(thisStep === 1){
        return {'done': true}
    }

    if(thisStep > currentStep.value){
        return {'done': false}
    }

    if(currentStep.value < thisStep){
        return {
            'collapsed': false,
        }
    }else{
        return {
            'collapsed': true,
        }
    }


}

</script>


<style scoped>
.steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    position: relative;
}
.step-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: v-bind(secondaryColor);
    transition: .4s;
}
.step-button[aria-expanded="true"] {
    width: 60px;
    height: 60px;
    background-color: v-bind(primaryColor);
    color: #fff;
}
.done {
    background-color: v-bind(primaryColor);
    color: #fff;
}
.step-item {
    z-index: 10;
    text-align: center;
}
#progress {
  -webkit-appearance:none;
    position: absolute;
    width: 95%;
    z-index: 5;
    height: 10px;
    margin-left: 18px;
    margin-bottom: 18px;
}
/* to customize progress bar */
#progress::-webkit-progress-value {
    background-color: v-bind(primaryColor);
    transition: .5s ease;
}
#progress::-webkit-progress-bar {
    background-color: v-bind(secondaryColor);

}
</style>