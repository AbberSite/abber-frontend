<template>
    <div class="relative" >
      <div class="space-y-3 mt-2" >
        <label class="block text-sm font-semibold xs:text-base">المستخدم</label>
        <div class="relative">
          <input
            type="text"
            class="form-control form-input h-[50px] w-full pr-4"
            placeholder="إختر مستخدم"
            v-model="searchQuery"
            @focus="showDropdown = true"
            @blur="hideDropdown"
          />
          <div
            class="absolute inset-y-0 left-2 flex items-center pr-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
        <div
          v-if="showDropdown"
          class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg"
        >
          <ul class="max-h-60 py-1 overflow-auto text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
            <li
              v-for="(user, index) in filteredUsers"
              :key="index"
              class="cursor-pointer select-none relative py-2 pl-3 pr-9"
              @mousedown.prevent="selectUser(user)"
            >
              <span class="font-normal block truncate">{{ user.first_name }}</span>
            </li>
          </ul>
        </div>
        <input type="hidden" :value="selectedUser?.id || ''" />
      </div>
      <InputError :message="errors.username" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useDashOperationsStore } from '~/stores/dashboard/dashOperations';
  
  const { users } = storeToRefs(useDashOperationsStore());
  
  const searchQuery = ref('');
  const showDropdown = ref(false);
  const selectedUser = ref(null);
  
  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    return users.value.filter(user =>
      user.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.id.toString().includes(searchQuery.value)
    );
  });
  
  const selectUser = (user) => {
    selectedUser.value = user;
    searchQuery.value = user.first_name;
    showDropdown.value = false;
  };
  
  const hideDropdown = () => {
    setTimeout(() => {
      showDropdown.value = false;
    }, 200); // Delay to allow click event to register
  };
  defineExpose({selectedUser});
  const errors = ref({
    username: ''
  });
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  