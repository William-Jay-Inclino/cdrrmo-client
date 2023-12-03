<template>

	<div id="wrapper" >
		<Sidebar />

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
	import Sidebar from './common/components/Sidebar.vue';
	// import Footer from '@/components/Footer.vue'
	import ScrollToTop from './common/components/ScrollToTop.vue'

</script>