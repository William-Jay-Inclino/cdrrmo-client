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
        </div>
    </div>
</div>

</template>


<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { userStore } from '..';

const $user = userStore()

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

const onClickStepBtn = async(stepId: number) => {
    console.log('onClickStepBtn()', stepId);

    if(stepId !== 1){
        if(!$user.isValidStep1()){
            return
        }
    }

    if(stepId > 3){
        if(!(await $user.isValidStep3())) {
            return 
        }
    }

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