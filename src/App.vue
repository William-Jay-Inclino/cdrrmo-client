
<template>

	<div>

		<div id="wrapper">
			<Sidebar />

			<div id="content-wrapper" class="d-flex flex-column">
				<div class="content">
					<Navbar />

					<!-- Main content -->
					<router-view/>

				</div>

				<!-- <Footer /> -->

			</div>

		</div>


		<ScrollToTop />
		<LogoutModal />

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

	// const test = async() => {
	// 	try {
	// 		const response = await config.api.get('/user');
	// 		console.log({response})
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// }
	
</script>


<style>

</style>