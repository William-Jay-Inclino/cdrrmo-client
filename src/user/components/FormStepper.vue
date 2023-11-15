<template>

<div class="container">
    <div class="accordion" id="accordionExample">
    <div class="steps">
        <progress id="progress" :value="progressVal" max="100"></progress>

        <div class="step-item" v-for="step in steps">
            <button @click="onClickStepBtn(step.id)" :class="step.stepClass" type="button" data-bs-toggle="collapse"
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

interface IStep{
    id: number,
    text: string,
    icon: string,
    dataBsTarget: string,
    stepClass: string,
}

const stepClassInitial = 'step-button text-center '

const steps = ref<IStep[]>([
    {
        id: 1,
        text: 'Basic Info',
        icon: 'fa-info',
        dataBsTarget: 'collapseOne',
        stepClass: stepClassInitial,
    },
    {
        id: 2,
        text: 'Skills',
        icon: 'fa-medal',
        dataBsTarget: 'collapseTwo',
        stepClass: stepClassInitial,
    },
    {
        id: 3,
        text: 'Authentication',
        icon: 'fa-lock',
        dataBsTarget: 'collapseOne',
        stepClass: stepClassInitial,
    },
    {
        id: 4,
        text: 'Finish',
        icon: 'fa-check-circle',
        dataBsTarget: 'collapseThree',
        stepClass: stepClassInitial,
    }
])

// aria expanded = true if same step


const currentStep = computed( () => props.currentStep)

watch(currentStep, (val: number) => {
    console.log('val', val)
    onClickStepBtn(val)
})

onMounted( () => {
    onClickStepBtn(currentStep.value)

})

const onClickStepBtn = (stepId: number) => {
    console.log('onClickStepBtn()', stepId);

    const current = steps.value.find((i) => i.id === stepId);

    if (!current) {
        console.error('Undefined step', current);
        return;
    }

    current.stepClass = `${stepClassInitial}collapsed`;

    steps.value.forEach((step, index) => {
        if (index < stepId - 1) {
            step.stepClass = `${stepClassInitial}done`;
        } else if (index > stepId - 1) {
            step.stepClass = stepClassInitial;
        }
    });

    progressVal.value = (stepId - 1) / (steps.value.length - 1) * 100;

    emit('update-step', current.id);
};


// const getStepClass = (thisStep: IStep) => {

//     console.log('getStepClass()', thisStep)

//     // previous = done: true | collapsed: false
//     // current = done: false | collapsed: true
//     // next = done: false | collapsed: false
    
//     // if(thisStep.id === 1){

//     // }

//     if(thisStep.isCurrent){
//         console.log('=== 1', {'done': false, 'collapsed': true})
//         return {'done': false, 'collapsed': true}
//     }

//     if(!thisStep.isCurrent && thisStep.id < currentStep.value){
//         console.log('=== 2', {'done': true, 'collapsed': false})
//         return {'done': true, 'collapsed': false}
//     }

//     console.log('=== 3', {'done': false, 'collapsed': false})
//     return {'done': false, 'collapsed': false}

// }

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