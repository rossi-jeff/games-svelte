<script lang="ts">
	import { page } from '$app/stores';
	import type { UserPass } from '../graphql/types/user-pass';
	import UserPassForm from './UserPassForm.svelte';
	import { blankSession, userSession, type UserSessionData } from '$lib/user-session';
	import { get } from 'svelte/store';
	import { graphQlClient } from '$lib';
	import { USER_LOGIN } from '../graphql/queries/user-login'
	import { USER_REGISTER } from '../graphql/mutations/user-registar';
	let routes = [
		{ name: 'Home', path: '/' },
		{ name: 'Code Breaker', path: '/codebreaker' },
		{ name: 'Guess Word', path: '/guessword' },
		{ name: 'Hangman', path: '/hangman' },
		{ name: 'Sea Battle', path: '/seabattle' },
		{ name: 'Yacht', path: '/yacht' }
	];
	let login: UserPass = {
		UserName: '',
		PassWord: ''
	};
	let register: UserPass = {
		UserName: '',
		PassWord: ''
	};
	let session: UserSessionData = get(userSession);

	const signInDialog = () => {
		let modal = document.getElementById('modal');
		let dialog = document.getElementById('login-dialog');
		if (modal && dialog) {
			modal.style.display = 'block';
			dialog.style.display = 'block';
		}
	};

	const registerDialog = () => {
		let modal = document.getElementById('modal');
		let dialog = document.getElementById('register-dialog');
		if (modal && dialog) {
			modal.style.display = 'block';
			dialog.style.display = 'block';
		}
	};

	const registerUser = () => {
		graphQlClient.request(USER_REGISTER,register)
			.then(() => {
				login.UserName = register.UserName
				closeRegisterDialog()
			})
			.catch((e) => console.error(e));
	};

	const closeRegisterDialog = () => {
		let modal = document.getElementById('modal');
		let dialog = document.getElementById('register-dialog');
		if (modal && dialog) {
			modal.style.display = 'none';
			dialog.style.display = 'none';
		}
	}

	const signInUser = () => {
		graphQlClient.request(USER_LOGIN,login)
		.then(result => {
			const { UserName, Token } = result.userLogin
			const SignedIn: boolean = true
			userSession.set({ UserName, Token, SignedIn })
			session = get(userSession);
			closeSignInDialog()
		})
		.catch((e) => console.error(e));
	};

	const closeSignInDialog = () => {
		let modal = document.getElementById('modal');
		let dialog = document.getElementById('login-dialog');
		if (modal && dialog) {
			modal.style.display = 'none';
			dialog.style.display = 'none';
		}
	}

	const signOut = () => {
		userSession.set(blankSession)
		session = get(userSession);
	}
</script>

<div class="nav-bar">
	<div class="left-section">
		{#each routes as route}
			<a href={route.path} class:active={route.path === $page.url.pathname}>{route.name}</a>
		{/each}
	</div>
	<div class="right-section">
		{#if session.SignedIn}
			<!-- signed in -->
			{session.UserName}
			<!-- <button>Change Password</button> -->
			<button on:click={signOut}>Sign Out</button>
		{:else}
			<!-- not signed in-->
			<button on:click={registerDialog}>Register</button>
			<button on:click={signInDialog}>Sign In</button>
		{/if}
	</div>
</div>

<div id="modal" class="modal-overlay">
	<!-- login dialog-->
	<div id="login-dialog">
		<div class="modal-header">Sign In</div>
		<div class="modal-content">
			<UserPassForm user={login} />
		</div>
		<div class="modal-controls">
			<button on:click={closeSignInDialog}>Cancel</button>
			<button on:click={signInUser}>Sign In</button>
		</div>
	</div>
	<!-- register dialog-->
	<div id="register-dialog">
		<div class="modal-header">Register</div>
		<div class="modal-content">
			<UserPassForm user={register} />
		</div>
		<div class="modal-controls">
			<button on:click={closeRegisterDialog}>Cancel</button>
			<button on:click={registerUser}>Register</button>
		</div>
	</div>
	<!-- change password dialog-->
	<div id="change-password-dialog">
		<div class="modal-header">Change PassWord</div>
		<div class="modal-content" />
		<div class="modal-controls">
			<button>click</button>
		</div>
	</div>
</div>

<style>
	div.nav-bar {
		@apply border border-blue-900 bg-blue-600 rounded p-2 mx-2 my-4 flex flex-wrap justify-between;
	}
	div.left-section {
		@apply flex flex-wrap;
	}
	div.right-section {
		@apply text-right;
	}
	div.right-section button {
		@apply text-xs ml-2 bg-blue-900 text-white p-2 rounded;
	}
	div.right-section button:hover {
		@apply text-yellow-300 bg-blue-800;
	}
	div.nav-bar a {
		@apply no-underline text-white font-bold mr-4 px-2 py-1;
	}
	div.nav-bar a:hover {
		@apply underline text-yellow-300;
	}
	div.modal-overlay {
		@apply fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full;
	}
	div.modal-header {
		@apply border bg-blue-800 border-blue-900 text-white rounded p-2;
	}
	div.modal-content {
		@apply p-0 my-2 max-h-56 overflow-y-auto;
	}
	div.modal-controls {
		@apply p-2 flex justify-between;
	}
	div.modal-controls button {
		@apply border bg-blue-800 border-blue-900 text-white rounded p-2;
	}
	div.modal-controls button:hover {
		@apply text-yellow-300 bg-blue-700;
	}
	div#login-dialog {
		@apply hidden mx-auto relative w-96 bg-white p-4 rounded top-24;
	}
	div#register-dialog {
		@apply hidden mx-auto relative w-96 bg-white p-4 rounded top-24;
	}
	div#change-password-dialog {
		@apply hidden mx-auto relative;
	}
	:global(div.nav-bar a.active) {
		@apply bg-blue-900 rounded;
	}
</style>
