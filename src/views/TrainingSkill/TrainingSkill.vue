<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Training Skills Module</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Training Skills</h6>
                        <button class="btn btn-primary" type="submit">Add Training Skill</button>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Training Skill Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="skill of $trainingSkill.trainingSkills">
                                        <td> {{ skill.description }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>

</template>


<script setup lang="ts">
    import { trainingSkillService, trainingSkillStore } from '@/modules/training_skill'

    const $trainingSkill = trainingSkillStore()
    const trainingSkills = trainingSkillService.getAllTrainingSkills()
    $trainingSkill.setTrainingSkills(trainingSkills)



</script>
