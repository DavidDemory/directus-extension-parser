import InterfaceComponent from './interface.vue';

export default {
	id: 'directus-parser',
	name: 'Directus Parser',
	icon: 'box',
	description: 'This field allow you to parse a string (for ex: key1=value1;key2=value2;) so that update keys and values is much easier.',
	component: InterfaceComponent,
	options: null,
	types: ['string'],
};
