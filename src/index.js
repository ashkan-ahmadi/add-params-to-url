import { $, addNewKeyValueToForm, getFormDataAsObject, addParamsToURL, showAddItemModal } from './_functions'

export default function App() {
  const form = $('#form')

  if (!form) {
    return
  }
  const addParameterButton = $('#add-parameter-button', form)

  // Every key:input will have the name as key-# and value-#
  let inputCount = 0

  form.addEventListener('submit', e => {
    e.preventDefault()

    const formData = getFormDataAsObject(form)

    const url = formData?.url || ''

    console.log(formData)

    if (!url) {
      alert('You must enter a valid URL (e.g. https://www.example.com)')
      e.target.elements.url.focus()
      return
    }

    // All optional params will be pushed into this object {key:value,key:value}
    const params = {}

    // Loop through keys to find "key-X" and "value-X" pairs
    // By ChatGPT: https://chatgpt.com/c/672231c0-044c-8013-9e59-c4ddd1c700a8
    for (let i = 1; formData[`key-${i}`] && formData[`value-${i}`]; i++) {
      params[formData[`key-${i}`]] = formData[`value-${i}`]
    }

    const finalurl = addParamsToURL(url, params)

    if (!finalurl) {
      return
    }

    showAddItemModal(finalurl)
  })

  addParameterButton.addEventListener('click', () => {
    inputCount++
    addNewKeyValueToForm(inputCount)
  })
}
