// mostly cribbed from https://gitlab.com/arty.name/firefox-extension-textarea-indent-tab/-/blob/master/index.js

if (!window.zoltuTabIndentInjected) {
	window.zoltuTabIndentInjected = true
	document.addEventListener('keydown', event => {
		// ignore all keypresses which are not Tabs, or have Ctrl or Alt or Meta pressed
		if (event.key !== 'Tab' || event.ctrlKey || event.altKey || event.metaKey) return

		const target = event.target
		// ignore all keypresses not inside textareas
		if (!(target instanceof HTMLTextAreaElement)) return

		const start = target.selectionStart;
		const end = target.selectionEnd;

		if (start === end) {
			target.setRangeText('\t', start, end, 'end')
		} else if (/[\n\r]/.test(target.value.substring(start, end))) {
			let text = target.value.substring(start, end)
			if (!event.shiftKey) {
				// when shift is not pressed insert tab after every newline except a trailing one
				text = '\t' + text.replace(/([\r\n]+)/g, '$1\t').replace(/([\r\n]+)\t$/, '$1')
			} else {
				// when shift is pressed remove 4 spaces after every newline
				text = text.replace(/(^|[\r\n]+)\t/g, '$1')
			}

			// construct the new value for textarea
			target.value = target.value.substring(0, start) + text + target.value.substring(end)
			// and restore the selection
			target.selectionStart = start
			target.selectionEnd = start + text.length
		}

		// prevent moving focus to the next control
		event.preventDefault()
	}, false)

	console.log('tabs in textareas now indent')
}
