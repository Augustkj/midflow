import { createClient } from '../src/core/createClient'

function run () {
    const client = createClient({ timeout: 1 * 1000 })

    client.client({ url: 'https://httpbin.org/delay/10 * 1000', method: 'POST' }).then(data => {
        console.log('data', data)
    }).catch(err => {
        console.log('err', err)
    })
}

run()