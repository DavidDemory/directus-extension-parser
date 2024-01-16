<template>
	<div class="container">
		<v-notice type="danger" v-if="hasError">
			<ul>
				<li v-if="hasEmptyPair">{{ $t('validationError.nempty') }}</li>
			</ul>
		</v-notice>
		<div class="containerKeyValue" v-for="(pair, index) in pairs" :key="index">
			<label>{{ $t('key') }} = {{ $t('value') }}</label>
			<input v-model="pair.key" @input="validateAndSet(pair, 'key')" />
			<input v-model="pair.value" @input="validateAndSet(pair, 'value')" />
			<!-- <button class="customButton" @click="removePair(index)"></button> -->
			<v-button small outlined @click="removePair(index)"><v-icon name="delete" />{{ $t('remove_item') }}</v-button>
		</div>
		<v-button small @click="addPair" :disabled="hasError"><v-icon name="add" />{{ $t('add_field') }}</v-button>
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
		hasError() {
			return this.hasEmptyPair;
		},
		compiledString() {
			return this.pairs.length > 0 ? this.pairs
				.map((pair) => `${pair.key}=${pair.value}`)
				.join(';') + ';' : null;
		},
		hasEmptyPair() {
			return this.pairs.some(pair => pair.key === '' || pair.value === '');
		},
		hasNotValidPair() {
			return this.pairs.some(pair => this.containsInvalidChars(pair.key) || this.containsInvalidChars(pair.value));
		},
	},
	methods: {
		// Function to validate and set the property
		validateAndSet(pair, property) {
			const sanitizedValue = this.sanitizeValue(pair[property]);
			pair[property] = sanitizedValue;
			this.updatePairs();
		},
		// Function to sanitize the value (remove invalid characters)
		sanitizeValue(value) {
			return value.replace(/[;=\s]/g, '');
		},
		parsePairs() {
			if (!this.value || this.value === '') return [];

			const pairs = this.value.split(';').filter(Boolean);

			return pairs.map((pair) => {
				const [key, value] = pair.split('=');
				return { key, value };
			});
		},
		updatePairs() {
			// Émettre l'événement uniquement si la chaîne compilée n'est pas vide
			if (this.compiledString == ';' || this.pairs.length === 0) {
				this.$emit('input', null);
			} else if(!this.hasEmptyPair) {
				this.$emit('input', this.compiledString)
			}
		},
		addPair() {
			this.pairs.push({ key: '', value: '' });
			this.updatePairs();
		},
		removePair(index) {
			this.pairs.splice(index, 1);
			this.updatePairs();
		},
		// Function to check if a string contains invalid characters
		containsInvalidChars(str) {
			return /[;=]/.test(str);
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
	transition-property: border-color, box-shadow;
	box-shadow: var(--theme--form--field--input--box-shadow);
}

input:hover {
	--arrow-color: var(--v-input-border-color-hover, var(--theme--form--field--input--border-color-hover));
	color: var(--v-input-color);
	background-color: var(--theme--form--field--input--background);
	border-color: var(--v-input-border-color-hover, var(--theme--form--field--input--border-color-hover));
	box-shadow: var(--theme--form--field--input--box-shadow-hover);
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