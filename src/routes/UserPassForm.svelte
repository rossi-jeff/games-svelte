<script lang="ts">
	import type { UserPass } from '../graphql/types/user-pass';

	export let user: UserPass = {};
</script>

<div class="user-pass-form">
	<div class="relative p-2">
		<input
			type="text"
			name="user-name"
			bind:value={user.UserName}
			placeholder=""
			autocomplete="off"
			class="w-full h-16 p-3 pt-4 placeholder-transparent border border-gray-200 rounded-md peer focus:outline-none focus:border-gray-500 focus:shadow-sm"
		/>
		<label
			for="user-name"
			class="absolute top-0 left-0 h-full px-3 py-5 text-sm transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
			>UserName</label
		>
	</div>
	<div class="relative p-2">
		<input
			type="password"
			name="pass-word"
			bind:value={user.PassWord}
			placeholder=""
			autocomplete="off"
			class="w-full h-16 p-3 pt-4 placeholder-transparent border border-gray-200 rounded-md peer focus:outline-none focus:border-gray-500 focus:shadow-sm"
		/>
		<label
			for="pass-word"
			class="absolute top-0 left-0 h-full px-3 py-5 text-sm transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
			>PassWord</label
		>
	</div>
</div>
