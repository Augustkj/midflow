export type Midderware<T extends Context = Context> = (ctx: T, next: Next) => Promise<void> | void

export type ClientParams = Omit<RequestInit, 'headers'> & { url: string }

export interface Context<T = unknown> {
    params: ClientParams
    headers?: Headers
    data: T
    response: unknown
    error?: Error
    timeout?: number
    adapter?: Adapter
    [key : string]: unknown
}

export type Next= () => Promise<void> | void

export type Adapter = (ctx: Context) => void | Promise<void>