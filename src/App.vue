<template>

	<div id="wrapper" >

		<SidebarAdmin v-if="authService.isAdmin()"/>
		<SidebarDispatcher v-else-if="authService.isDispatcher()"/>

		<div id="content-wrapper" class="d-flex flex-column">
			<div class="content">
				<Navbar/>

				<!-- Main content -->
				<router-view/>

			</div>

			<!-- <Footer /> -->

		</div>

		<ScrollToTop />

	</div>


</template>

<script setup lang="ts">

	import Navbar from './common/components/Navbar.vue';
	import SidebarAdmin from './common/components/SidebarAdmin.vue';
	import SidebarDispatcher from './common/components/SidebarDispatcher.vue';
	// import Footer from '@/components/Footer.vue'
	import ScrollToTop from './common/components/ScrollToTop.vue'
	import { authService } from './auth';



</script>