const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Mr.Hello',
        quote: 'Upgraded Membership.'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
  })

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Mr.Hello'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No membership to delete') {
          messageDiv.textContent = 'No membership to delete, Mr.Hello'
        } else {
          window.location.reload(true)
        }
      })
      .catch(error => console.error(error))
  })