<template>
	<v-app>
		<v-app-bar absolute app clipped-left dark flat>
			<template v-slot:img="{ props }">
				<v-img v-bind="props" src="./assets/bg-dbgbyzFR8uI.jpg" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
			</template>
			<v-app-bar-nav-icon @click.stop="isNavigationVisible = !isNavigationVisible"></v-app-bar-nav-icon>
			<v-toolbar-title>Management</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon to="/barcode">
				<v-icon>mdi-barcode-scan</v-icon>
			</v-btn>
			<v-btn text :to="`/profile/${this.getUser.id}`" v-if="!!this.$store.state.token">Hey, {{ this.getUser.firstname + ' ' + this.getUser.lastname}}</v-btn>
			<v-btn icon to="/signin" v-if="!!this.$store.state.token === false">
				<v-icon>mdi-login</v-icon>
			</v-btn>
			<v-btn icon @click="logout()" v-else>
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
					
		<v-navigation-drawer app clipped flat left v-model="isNavigationVisible">
			<v-list nav>
				<v-list-item link v-for="(item, itemIndex) in items" :key="itemIndex" :to="item.link">
					<v-list-item-icon>
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title v-text="item.text"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	watch: {
		$route() {
			this.isNavigationVisible = false
		}
	},
	computed: {
		getUser () {
			return this.$store.state.user;
		}
	},
	data: () => ({
		isNavigationVisible: false,
		items: [
			{ text: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/'}, 
			{ text: 'Software', icon: 'mdi-apps', link: '/software' },
			{ text: 'Hardware', icon: 'mdi-desktop-classic', link: '/hardware' },
			{ text: 'Order', icon: 'mdi-cart-outline', link: '/order' },
			{ text: 'Groups', icon: 'mdi-account-group-outline', link: '/groups' },
			{ text: 'Users', icon: 'mdi-account-outline', link: '/users' },
		],
		loginState: false,
	}),
	methods: {
		logout () {
			this.$store.dispatch('logout');
		}
	},
};
</script>
