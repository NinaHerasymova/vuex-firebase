<template>
    <section>
        <base-card>
            <h2>register as a coach</h2>
            <coach-form @save-data="saveData"></coach-form>
        </base-card>
    </section>
</template>

<script>

  import CoachForm from '../../components/coaches/CoachForm';

  export default {
    name: 'CoachRegister',
    components: { CoachForm },
    methods: {
      saveData(data) {
        this.$store.dispatch('coaches/registerCoach', data);
        this.$router.replace('/coaches')
      }
    }
  };
</script>

<style scoped>

</style>
