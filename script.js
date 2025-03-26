// 🏆 Snack 1
// Ottieni il titolo di un post con una Promise.

// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.


const getPostTitle = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(obj => resolve(obj.title))
      .catch(reject)
  })
}


const getPost = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(obj => {
        fetch(`https://dummyjson.com/users/${obj.userId}`)
          .then(response => response.json())
          .then(user => {
            obj.user = user
            resolve(obj)
          })
          .catch(reject)
      })
      .catch(reject)
  })
}

getPostTitle(1)
  .then(postTitle => {
    console.log("Titolo Post:", postTitle)
  })
  .catch(err => console.error(err))

getPost(1)
  .then(post => {
    console.log("Post Completo di Autore:", post)
  })
  .catch(err => console.error(err))

// 🏆 Snack 2
// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".

const lanciaDado = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dado = Math.floor(Math.random() * 6) + 1
      if (Math.random() < 0.2) {
        reject("Dado Incastrato")
      } else {
        resolve(dado)
      }
    })
  })
}

lanciaDado()
  .then(dado => console.log("Dado:", dado))
  .catch(err => console.error(err))

const creaLanciaDado = () => {
  let ultimoLancio = null
  return () => {
    lanciaDado()
      .then(dado => {
        if (dado === ultimoLancio) {
          console.log(`Incredibile!, è uscito di nuovo ${dado}`)
        } else {
          console.log("Dado:", dado)
        }
        ultimoLancio = dado  // Move the update here
      })
      .catch(err => console.error(err))
  }
}

const lancioDado = creaLanciaDado()

// Lancia il dado multiple volte
setInterval(lancioDado, 1000)