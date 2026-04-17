/**
 * https://httpbin.org/
 */
import { createFetchAdapter, parseJson } from '../src/adapters/fetch'


async function require() {
    const ctx = {
        response: null,
        data: null,
        params: {
            url: 'https://httpbin.org/post',
            method: 'POST'
        }
    }
    const fetchAdapter = createFetchAdapter({ pareser: parseJson })
    await fetchAdapter(ctx)
    console.log(ctx)
}

require()
