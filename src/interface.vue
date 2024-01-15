<template>
	<div class="container">
	  <div class="containerKeyValue" v-for="(pair, index) in pairs" :key="index">
		<label>{{ $t('key') }} = {{ $t('value') }}</label>
		<input v-model="pair.key" @input="updatePairs" />
		<input v-model="pair.value" @input="updatePairs" />
		<button class="customButton" @click="removePair(index)">{{ $t('remove_item') }}</button>
	  </div>
	  <button class="customButton" @click="addPair">{{ $t('add_field') }}</button>
  
	  <div>
		<strong>{{ $t('string') }}:</strong> {{ compiledString }}
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
  
  <style scoped>
  input {
	padding: calc(var(--theme--form--field--input--padding) / 2);
    padding-top: 0;
    padding-bottom: 0;
    color: var(--v-input-color, var(--theme--form--field--input--foreground));
    font-family: var(--v-input-font-family, var(--theme--fonts--sans--font-family));
    background-color: var(--v-input-background-color, var(--theme--form--field--input--background));
    border: var(--theme--border-width) solid var(--v-input-border-color, var(--theme--form--field--input--border-color));
    border-radius: var(--v-input-border-radius, var(--theme--border-radius));
    transition: var(--fast) var(--transition);
    transition-property: border-color,box-shadow;
    box-shadow: var(--theme--form--field--input--box-shadow);
  }

  input:hover {
	--arrow-color: var(--v-input-border-color-hover, var(--theme--form--field--input--border-color-hover));
    color: var(--v-input-color);
    background-color: var(--theme--form--field--input--background);
    border-color: var(--v-input-border-color-hover, var(--theme--form--field--input--border-color-hover));
    box-shadow: var(--theme--form--field--input--box-shadow-hover);
  }

  input:focus-within, button:focus, button:hover {
	--arrow-color: var(--v-input-border-color-hover, var(--theme--form--field--input--border-color-hover));
    color: var(--v-input-color);
    background-color: var(--theme--form--field--input--background);
    border-color: var(--v-input-border-color-focus, var(--theme--form--field--input--border-color-focus));
    box-shadow: var(--theme--form--field--input--box-shadow-focus);
  }
  
  button {
    color: var(--v-input-color, var(--theme--form--field--input--foreground));
    font-family: var(--v-input-font-family, var(--theme--fonts--sans--font-family));
    background-color: var(--v-input-background-color, var(--theme--form--field--input--background));
    border: var(--theme--border-width) solid var(--v-input-border-color, var(--theme--form--field--input--border-color));
    border-radius: var(--v-input-border-radius, var(--theme--border-radius));
    transition: var(--fast) var(--transition);
    transition-property: border-color,box-shadow;
    box-shadow: var(--theme--form--field--input--box-shadow);
	padding: .25rem .5rem;
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
	align-items: center;
	gap: 1rem;
  }
  </style>