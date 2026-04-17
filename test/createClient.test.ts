import { createClient } from '../src/core/createClient'

function run () {
    const client = createClient({ timeout: 15* 1000 })

    client.request({ url: 'https://httpbin.org/post', method: 'POST' }).then(data => {
        console.log('data', data)
    }).catch(err => {
        console.log('err', err)
    })
}

run()