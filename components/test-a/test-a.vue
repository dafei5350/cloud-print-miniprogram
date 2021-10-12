<template>
	<view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-grey lg">{{ msg }}</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:"test-a",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('Search', ['msg'])
		}
	}
</script>

<style lang="stylus">

</style>
