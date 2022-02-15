import { showAlert } from '$lib/utils/alerts';

export function checkFeaturesSupport() {
	const notSupportedFeatures = [window.showOpenFilePicker].some(
		(feature) => typeof feature === 'undefined'
	);

	if (notSupportedFeatures) {
		showAlert({
			title: 'Features not supported',
			html: `<section style="text-align:left"><p>We&rsquo;re quite sorry about this!</p><p>Your browser doesn&rsquo;t support File System Access API, which is&nbsp;using in&nbsp;RecqReader for book management.</p><p>Please, use Chrome browser!</p></section>`,
			showCancelButton: false,
			showDenyButton: false,
			showConfirmButton: false,
			allowOutsideClick: false
		});
	}
}
