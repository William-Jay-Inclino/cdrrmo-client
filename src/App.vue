
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

				<Footer />

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

	import Navbar from '@/components/Navbar.vue';
	import Sidebar from '@/components/Sidebar.vue';
	import Footer from '@/components/Footer.vue'
	import LogoutModal from '@/components/LogoutModal.vue'
	import ScrollToTop from '@/components/ScrollToTop.vue'

	import { appStore } from '@/modules/app'

	const $app = appStore()
	$app.init()
	
</script>


<style>

</style>./modules/app.store