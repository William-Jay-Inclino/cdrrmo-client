
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

	import Navbar from '@/common/components/Navbar.vue';
	import Sidebar from '@/common/components/Sidebar.vue';
	// import Footer from '@/components/Footer.vue'
	import LogoutModal from '@/common/components/LogoutModal.vue'
	import ScrollToTop from '@/common/components/ScrollToTop.vue'

	// import { appStore } from '@/modules/app'

	// const $app = appStore()
	// $app.init()
	
</script>


<style>

</style>./modules/app.store