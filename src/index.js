import { $, addNewKeyValueToForm, getFormDataAsObject, addParamsToURL, showAddItemModal } from './_functions'

export default function App() {
  // Get the form element
  const form = $('#form')

  // Stop if no form is found
  if (!form) {
    return
  }

  // Get the Add Parameter HTML button inside the form element
  const addParameterButton = $('#add-parameter-button', form)

  // This is the initial input count which tracks how many query parameters have been created
  // We increment this by 1 every time a new key/value group is created
  // Every key:input will have the name as key-# and value-#
  let inputCount = 0

  form.addEventListener('submit', e => {
    e.preventDefault()

    // Returns all the input values of the form as an object
    const formData = getFormDataAsObject(form)

    const url = formData?.url || ''

    if (!url) {
      // alert('You must enter a valid URL (e.g. https://www.example.com)')
      e.target.elements.url.focus()
      return
    }

    // All optional params will be pushed into this object {key-#:value,key-#:value}
    const params = {}

    // Create an object of key/value pairs (e.g. source:facebook)
    for (let i = 1; i <= inputCount; i++) {
      // It's possible to add a key/value input group to the DOM, and then delete it
      // When it's deleted, we do not change the inputCount in any way
      // This if guard clause ensures that if an input group is deleted, we skip over it. Otherwise, we will end up with undefined:undefined in the params array and that will end up as undefined=undefined in the final URL
      // If that's the case, we continue/skip to the next iteration
      if (!(formData[`key-${i}`] && formData[`value-${i}`])) {
        continue
      }

      params[formData[`key-${i}`]] = formData[`value-${i}`]
    }

    // Create the URL with the query parameters attached to it
    const finalurl = addParamsToURL(url, params)

    if (!finalurl) {
      return
    }

    // Show modal so the user can copy the URL
    showAddItemModal(finalurl)
  })

  addParameterButton.addEventListener('click', () => {
    // Increment so every key/value group can be matched easily
    inputCount++

    // Add a new key/value input group to the DOM
    addNewKeyValueToForm(inputCount)
  })
}
