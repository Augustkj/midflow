import { Context, Midderware, Adapter, ClientParams } from '@types'
import { transportMw, timeoutMw } from '@middleware'
import { createFetchAdapter } from '@adapters'
import { compose } from './compose'

type ClientOptions = {
    timeout?: number
    adapter?: Adapter
}

export function createClient(options?: ClientOptions) {
    const baseMiddlewares: Midderware[] = []
    let baseAdapter: Adapter = createFetchAdapter()

    const api = {
        use(mw: Midderware) {
            baseMiddlewares.push(mw)
            return api
        },

        useAdapter(adapter: Adapter) {
            baseAdapter = adapter
            return api
        },

        client(clientOptions: ClientParams) {
            const { method = 'POST', ...cOptions } = clientOptions
            return run(method, cOptions)
        }
    }
    

    function run(method: string, clientOptions: Omit<ClientParams, 'method'>) {
        const context: Context = {
            params: { ...clientOptions, method },
            data: undefined,
            response: undefined,
            timeout: options?.timeout,
            adapter: options?.adapter || baseAdapter || createFetchAdapter()
        }
         return compose(...baseMiddlewares, timeoutMw, transportMw)(context)
    }

    return api
}
