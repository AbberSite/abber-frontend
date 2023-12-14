<template>
	<Combobox v-model="selected" class="z-30">
		<div class="relative">
			<label class="text-sm font-semibold xs:text-base" for="tel">رقم الهاتف</label>

			<div class="flex">
				<div class="w-full space-y-3">
					<input v-model="phone" class="form-control h-[50px] appearance-none text-right" type="tel" name="phone" id="tel"
						placeholder="رقم الهاتف" autocomplete="tel" required />
				</div>
				<div class="flex relative">
					<ComboboxInput
						class="pl-3 pr-10 text-sm w-32 max-w-xs form-control h-[50px] appearance-none  rounded-none rounded-tl-md rounded-bl-md text-left"
						:displayValue="(country) =>
							getFlagEmoji(getCountryByCode(country)?.code) +
							' ' +
							`+(${getCountryByCode(country)?.value})`
							" @change="query = $event.target.value" />
					<ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
						</svg>

					</ComboboxButton>
				</div>
			</div>
			<transition enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0">
				<ComboboxOptions
					class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-md py-1 shadow-lg text-base-content ring-opacity-5 focus:outline-none sm:text-sm">
					<div v-if="filteredCountries.length === 0 && query !== ''"
						class="relative cursor-default select-none py-2 px-4 text-gray-700">
						Nothing found.
					</div>

					<ComboboxOption v-for="country in filteredCountries" as="template" :key="country.name"
						:value="country.value" v-slot="{ selected, active }">
						<li class="relative select-none py-2 px-2 cursor-pointer" :class="{
							'bg-primary text-primary-content': active,
							'text-base-primary': !active,
						}">
							<span class="block truncate" :class="{
								'font-medium': selected,
								'font-normal': !selected,
							}">
								{{
									getFlagEmoji(country.code) +
									" " +
									country.name
								}}
							</span>
							<span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3" :class="{
								'text-white': active,
								'text-teal-600': !active,
							}">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
									stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
								</svg>

							</span>
						</li>
					</ComboboxOption>
				</ComboboxOptions>
			</transition>
		</div>
	</Combobox>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import countries from "~/utils/countries";

import {
	Combobox,
	ComboboxInput,
	ComboboxButton,
	ComboboxOptions,
	ComboboxOption,
} from "@headlessui/vue";

const props = defineProps(["modelValue"]);
const selected = ref(966);
const query = ref("");

const phone = ref("")
const emits = defineEmits(["update:modelValue"]);
watch(selected, (value) => {
	emits("update:modelValue", value + phone.value);
});
watch(phone, (value) => {
	
	if(!isNumeric(value)){
		phone.value = phone.value.slice(0, value.length - 1)
	}

	if(value.length > 10) {
		phone.value = phone.value.slice(0, 10)
	}
	emits("update:modelValue", selected.value + phone.value)} )
function getCountryByCode(code : string) {
	return countries.find((country) => country.value == code);
}


function isNumeric(num : any){
  return !isNaN(num)
}
function getFlagEmoji(countryCode : any ) {
	if (!countryCode) return "none";
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char : any) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

let filteredCountries = computed(() =>
	query.value === ""
		? countries
		: countries.filter((country) =>
			country.name
				.toLowerCase()
				.replace(/\s+/g, "")
				.includes(query.value.toLowerCase().replace(/\s+/g, ""))
		)
);
</script>
