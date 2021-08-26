import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Order from '../views/Order.vue'
import SoftwareList from '../views/Software/List.vue'
import SoftwareEdit from '../views/Software/Edit.vue'
import HardwareList from '../views/Hardware/List.vue'
import HardwareEdit from '../views/Hardware/Edit.vue'
import Barcode from '../views/Barcode.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/order',
		name: 'Order',
		component: Order
	},
	{
		path: '/software',
		name: 'Software',
		component: SoftwareList
	},
	{
		path: '/software/new',
		name: 'New Software',
		component: SoftwareEdit 
	},
	{
		path: '/software/edit/:id',
		name: 'Edit Software',
		component: SoftwareEdit
	},
	{
		path: '/hardware',
		name: 'Hardware',
		component: HardwareList
	},
	{
		path: '/hardware/new',
		name: 'New Hardware',
		component: HardwareEdit
	},
	{
		path: '/hardware/edit/:id',
		name: 'Edit Hardware',
		component: HardwareEdit
	},
	{
		path: '/barcode',
		name: 'Barcode',
		component: Barcode
	}
];

const router = new VueRouter({
	routes
});

export default router;