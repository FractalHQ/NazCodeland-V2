import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

// subscriptions always run with the initial value
export const colorSchemeStore: Writable<string> = writable('light');

export function toggleColorScheme() {
	colorSchemeStore.update((theme: string) => {
		return theme === 'light' ? 'dark' : 'light';
	});
}

export function getBrowserPreferredColorScheme() {
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initializeColorScheme() {
	if (browser) {
		const colorScheme = window.localStorage.getItem('NazCodeland.colorScheme');
		colorSchemeStore.set(colorScheme ?? getBrowserPreferredColorScheme());
	}
}
initializeColorScheme();

colorSchemeStore.subscribe((colorScheme) => {
	if (browser) window.localStorage.setItem('NazCodeland.colorScheme', colorScheme);
});

// paletteStore
export const paletteStore = writable('mainPalette');

function initializeThemePalette() {
	if (browser) {
		const theme = window.localStorage.getItem('NazCodeland.theme');
		console.log('-------------', theme);
		if (theme) {
			console.log(theme);
			paletteStore.set(theme);
		}
	}
}

initializeThemePalette();

paletteStore.subscribe((theme) => {
	if (browser) {
		window.localStorage.setItem('NazCodeland.theme', theme);
	}
});
