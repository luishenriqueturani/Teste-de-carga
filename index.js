function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const baseUrl = process.env.BASE_URL

const post = async () => {
  try {

    let controller = new AbortController()
    //console.log(controller.signal)

    setTimeout(() => {
      controller.abort()
    }, 30000) // Aborta após 10 segundos

    const i = getRandomInt(99999)

    return await fetch(`${baseUrl}users/create-visitor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: `Teste${i}`,
        password: '123456',
        password_confirmation: '123456',
        email: `teste${i}@teste.com.br`,
        document: '33803806000177',
        phone: '1199999999',
        segment_id: '462cfe28-b7d4-442e-8dd6-0d6f7424f0e1',
        company: 'teste',
        cep: '12345678',
        street: 'Rua teste',
        number: '123',
        city: 'São Paulo',
        state: 'SP',
        neighborhood: 'Brasil',
        complement: 'teste',
      }), 
      signal: controller.signal
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

const get = async () => {
  try {
    let controller = new AbortController()
    //console.log(controller.signal)

    setTimeout(() => {
      controller.abort()
    }, 30000) // Aborta após 10 segundos

    return await fetch(`${baseUrl}partners/get-categories`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

const init = async () => {

  if (!baseUrl) {
    console.log('baseUrl não configurado')
    return
  }

  let cont = 0
  let success = 0
  let fail = 0
  /* const resultCreateUser = await post()

  console.log(await resultCreateUser.text())
  return */

  for (let i = 0; i < 100; i++) {

    const requests = Array.from({length: 10 * i}, async () => {

      const resultCreateUser = await post()
  
      cont++
  
      if (resultCreateUser) {
        if (resultCreateUser.status == 201 || resultCreateUser.status == 200) {
          success++
        } else {
          fail++
        }
      } else {
        fail++
      }
  
      const resultGetCategories = await get()
  
      cont++
  
      if (resultGetCategories) {
        if (resultGetCategories.status === 200) {
          success++
        } else {
          fail++
        }
      } else {
        fail++
      }
    })

    await Promise.all(requests)
  }

  console.table({
    cont,
    success,  
    fail
  })


}

init()

