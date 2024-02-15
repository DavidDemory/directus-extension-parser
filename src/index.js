import InterfaceComponent from './interface.vue';

export default {
	id: 'directus-key-value-parser',
	name: 'Directus Key Value Parser',
	icon: 'input',
	description: 'This interface allows you to parse a string (for ex: key1=value1;key2=value2;) so that update keys and values is much easier.',
	component: InterfaceComponent,
	options: null,
	types: ['string'],
};
