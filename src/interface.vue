<template>
	<div class="container">
	  <div class="containerKeyValue" v-for="(pair, index) in pairs" :key="index">
		<label>Key = Valeur</label>
		<input v-model="pair.key" @input="updatePairs" />
		<input v-model="pair.value" @input="updatePairs" />
		<button class="customButton" @click="removePair(index)">Remove</button>
	  </div>
	  <button class="customButton" @click="addPair">Add Pair</button>
  
	  <div>
		<strong>Compiled String:</strong> {{ compiledString }}
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	props: {
	  value: {
		type: String,
		default: '',
	  },
	},
	emits: ['input'],
	data() {
	  return {
		pairs: this.parsePairs(),
	  };
	},
	computed: {
	  compiledString() {
		return this.pairs
		  .map((pair) => `${pair.key}=${pair.value}`)
		  .join(';') + ';';
	  },
	},
	methods: {
	  parsePairs() {
		if (!this.value) return [];
  
		const pairs = this.value.split(';').filter(Boolean);
  
		return pairs.map((pair) => {
		  const [key, value] = pair.split('=');
		  return { key, value };
		});
	  },
	  updatePairs() {
		this.$emit('input', this.compiledString);
	  },
	  addPair() {
		this.pairs.push({ key: '', value: '' });
		this.updatePairs();
	  },
	  removePair(index) {
		this.pairs.splice(index, 1);
		this.updatePairs();
	  },
	},
	watch: {
	  value(newVal) {
		this.pairs = this.parsePairs(newVal);
	  },
	},
  };
  </script>
  
  <style>
  .customButton {
	border: 1px solid white;
	border-radius: 5px;
	padding: .25rem .5rem;
	transition: all .3s ease-in-out;
  }
  .customButton:hover {
	background-color: white;
	border-color: black;
	color: black;
  }
  .container {
	display: flex;
	flex-direction: column;
	gap: .5rem;
	align-items: start;
  }
  .containerKeyValue {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: 1rem;
  }
  </style>