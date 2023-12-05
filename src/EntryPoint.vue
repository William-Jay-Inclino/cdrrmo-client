<template>
	<component :is="currentComponent" />
</template>
  
  <script setup lang="ts">
	import App from './App.vue';
	import Login from './auth/Login.vue';
	import NotFound from './common/components/NotFound.vue';
	import Unauthorized from './common/components/Unauthorized.vue';
	import { useRoute } from 'vue-router';
	import { computed } from 'vue';
	import { routeNames } from './common';
	
	const route = useRoute();
	
	const currentComponent = computed(() => {

		if (route.path === '/') {

			console.log('LOGIN COMPONENT RENDERED')
			return Login;

		} else if (route.name === routeNames.notFound) {

			console.log('NOT FOUND COMPONENT RENDERED')
			return NotFound;

		} else if (route.name === routeNames.unauthorized) {

			console.log('UNAUTHORIZED COMPONENT RENDERED')
			return Unauthorized;

		}  
		else {

			console.log('MAIN COMPONENT RENDERED')
			return App;

		}
	});
  </script>
  