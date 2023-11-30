
<template>

	<div id="wrapper">
		<Sidebar v-if="showSidebar"/>

		<div id="content-wrapper" class="d-flex flex-column">
			<div class="content">
				<Navbar v-if="showNavbar"/>

				<!-- Main content -->
				<router-view/>

			</div>

			<!-- <Footer /> -->

		</div>

	</div>


	<ScrollToTop/>
	<LogoutModal/>


</template>



<script setup lang="ts">

	import Navbar from './common/components/Navbar.vue';
	import Sidebar from './common/components/Sidebar.vue';
	// import Footer from '@/components/Footer.vue'
	import LogoutModal from './common/components/LogoutModal.vue'
	import ScrollToTop from './common/components/ScrollToTop.vue'

    import { useRoute } from 'vue-router';

	import { appStore } from './app';
	// import { routeNames } from './common';
	import { computed } from 'vue';
	
	const $app = appStore()
	$app.init()


	const route = useRoute();


	const showSidebar = computed( () => route.path !== '/')
	const showNavbar = computed( () => route.path !== '/')

</script>