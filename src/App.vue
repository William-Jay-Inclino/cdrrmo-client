
<template>

	<div>

		<div id="wrapper">
			<Sidebar v-if="!isLoginPage"/>

			<div id="content-wrapper" class="d-flex flex-column">
				<div class="content">
					<Navbar v-if="!isLoginPage"/>

					<!-- Main content -->
					<router-view/>

				</div>

				<!-- <Footer /> -->

			</div>

		</div>


		<ScrollToTop v-if="!isLoginPage"/>
		<LogoutModal v-if="!isLoginPage"/>

	</div>




	<!-- <div class="container mt-5">
		<router-view/>
	</div> -->


</template>



<script setup lang="ts">

	import Navbar from './common/components/Navbar.vue';
	import Sidebar from './common/components/Sidebar.vue';
	// import Footer from '@/components/Footer.vue'
	import LogoutModal from './common/components/LogoutModal.vue'
	import ScrollToTop from './common/components/ScrollToTop.vue'

    import { useRoute } from 'vue-router';

	import { appStore } from './app';
	import { ref } from 'vue';
	
	const $app = appStore()

	$app.init()

	const route = useRoute();
	const isLoginPage = ref(route.path === '/')

	console.log('isLoginPage', isLoginPage.value)

</script>