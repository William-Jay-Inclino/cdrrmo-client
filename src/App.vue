
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


	<ScrollToTop v-if="showScrollToTop"/>
	<LogoutModal v-if="showLogoutModal"/>

</template>



<script setup lang="ts">

	import Navbar from './common/components/Navbar.vue';
	import Sidebar from './common/components/Sidebar.vue';
	// import Footer from '@/components/Footer.vue'
	import LogoutModal from './common/components/LogoutModal.vue'
	import ScrollToTop from './common/components/ScrollToTop.vue'

    import { useRoute } from 'vue-router';
	import { computed } from 'vue';


	const route = useRoute();


	const showSidebar = computed( () => route.path !== '/')
	const showNavbar = computed( () => route.path !== '/')
	const showScrollToTop = computed( () => route.path !== '/')
	const showLogoutModal = computed( () => route.path !== '/')


</script>