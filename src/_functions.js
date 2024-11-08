export function $(target, selector = document) {
  return selector.querySelector(target)
}

export function $$(target, selector = document) {
  return selector.querySelectorAll(target)
}

export function copyToClipboard() {
  const value = resultInput.value

  if (!value) {
    return
  }

  copyTextToClipboard(
    value,
    () => {
      alert('✅ Copied')
    },
    () => {
      alert('There was an issue. Try again.')
    }
  )
}

export function addNewKeyValueToForm(inputCount) {
  const div = document.createElement('div')
  div.classList.add('input-group', 'mb-3')

  const labelKey = document.createElement('label')
  labelKey.classList.add('input-group-text')
  labelKey.setAttribute('for', `key-${inputCount}`)
  labelKey.textContent = 'Key'

  const inputKey = document.createElement('input')
  inputKey.classList.add('form-control')
  inputKey.setAttribute('type', 'text')
  inputKey.setAttribute('name', `key-${inputCount}`)
  inputKey.setAttribute('id', `key-${inputCount}`)
  inputKey.setAttribute('list', 'keys_list') // this is in the DOM - https://www.w3schools.com/tags/tag_datalist.asp
  inputKey.setAttribute('placeholder', 'e.g. source')
  inputKey.setAttribute('required', 'true')

  const labelValue = document.createElement('label')
  labelValue.classList.add('input-group-text')
  labelValue.setAttribute('for', `value-${inputCount}`)
  labelValue.textContent = 'Value'

  const inputValue = document.createElement('input')
  inputValue.classList.add('form-control')
  inputValue.setAttribute('type', 'text')
  inputValue.setAttribute('name', `value-${inputCount}`)
  inputValue.setAttribute('id', `value-${inputCount}`)
  inputValue.setAttribute('list', 'values_list') // this is in the DOM - https://www.w3schools.com/tags/tag_datalist.asp
  inputValue.setAttribute('placeholder', 'e.g. instagram')
  inputValue.setAttribute('required', 'true')
  // inputValue.setAttribute('', '')

  const deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.classList.add('btn', 'btn-sm', 'btn-danger')
  deleteButton.innerHTML = '<i class="bi bi-trash3-fill" aria-label="Delete parameters"></i>'
  deleteButton.addEventListener('click', () => {
    // not using e.target because otherwise clicking on the icon inside the buttom isn't the same as clicking on the button
    deleteButton.parentNode.remove()
  })

  div.appendChild(labelKey)
  div.appendChild(inputKey)
  div.appendChild(labelValue)
  div.appendChild(inputValue)
  div.appendChild(deleteButton)

  const repeatableInputs = document.querySelector('#repeatable-inputs')

  repeatableInputs.appendChild(div)
}

export function getFormDataAsObject(form) {
  /**
   * Returns the form's input values as an object
   * Note: Only successful form controls are included in a FormData object, i.e. those with a name and not in a disabled state.
   *
   * @param {HTMLElement} form - the form whose data you want to get
   *
   * @return {object} an object with
   */

  const formData = new FormData(form)
  return Object.fromEntries(formData)
}

export function addParamsToURL(baseURL, params = {}, encode = false) {
  /**
   * Adds params to the end of a URL and returns the complete URL with
   *
   * @param {string} baseURL - the URL you want the params to be added to
   * @param {object} [params={}] - an object with keys and values to be added to the URL as params
   * @param {bool} [encode=false] - whether to return the final URL encoded or not (default not encoded)
   *
   * @return {string} complete URL
   */

  const url = new URL(baseURL)
  for (const key in params) {
    const value = params[key]
    url.searchParams.append(key, value)
  }

  return encode ? encodeURIComponent(url.href) : url.href
}

export function copyTextToClipboard(text, onSuccess = function () {}, onFail = function () {}) {
  /**
   * Copy string to clipboard
   *
   * @important = navigator.clipboard works ONLY on HTTPS protocol, not on http
   * Because of that, copyTextToClipboard__deprecated will be used on http
   *
   * @source https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
   * @param string text - A string to copy to clipboard
   * @param function onSuccess - (optional) a function to run on successful copying
   * @param function onFail - (optional) a function to run if copying fails
   *
   * @return undefined
   */
  if (!navigator.clipboard) {
    copyTextToClipboard__deprecated(text, onSuccess, onFail)
    return
  }

  navigator.clipboard
    .writeText(text)
    .then(function () {
      onSuccess()
    })
    .catch(function (err) {
      onFail()
      console.error('Async: Could not copy text: ', err)
    })
}

export function copyTextToClipboard__deprecated(text, onSuccess = function () {}, onFail = function () {}) {
  /**
   * @important This method of copying string to clipboard is outdated and not advised
   * This is simply a fallback function now in case the protocol is not HTTPS or browser is outdated
   *
   * @source https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
   * @param string text - A string to copy to clipboard
   * @param function onSuccess - (optional) a function to run on successful copying
   * @param function onFail - (optional) a function to run if copying fails
   *
   * @deprecated
   * @return undefined
   */

  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    if (successful) {
      onSuccess()
    } else {
      onFail()
    }
  } catch (err) {
    onFail()
    console.error('Fallback: Unable to copy', err)
  }

  document.body.removeChild(textArea)
}
