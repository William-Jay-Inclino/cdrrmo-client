<template>

	<div id="wrapper" >

		<div class="fixed-sidebar">
			<SidebarAdmin v-if="authService.isAdmin()" />
			<SidebarDispatcher v-else-if="authService.isDispatcher()" />
		</div>

		<div
		  id="content-wrapper"
		  class="d-flex flex-column"
		  :style="
		  	{ 
				backgroundImage: 'url(' + config.baseUrl + 'images/module-bg.jpg)', 
				backgroundRepeat: 'no-repeat', 
				backgroundAttachment: 'fixed', 
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
				minHeight: '100vh'
			}
		">
			<div class="content">
				<Navbar/>

				<!-- Main content -->
				<div style="margin-top: 100px;">
					<router-view/>
				</div>

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
	import { config } from './config';



</script>


<style>
.fixed-sidebar {
  position: fixed;
  height: 100%;
  z-index: 90;
}

.container-fluid{
	padding-left: 16rem
}


</style>