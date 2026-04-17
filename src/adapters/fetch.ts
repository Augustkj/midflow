import { Context, Adapter } from "@types";
import { getSignal } from "src/core/runtime";

type FetchAdapterOprions<T = unknown> = {
    pareser?: (res: Response) => Promise<T> | Response | Promise<string> | Promise<Blob>
}

export const createFetchAdapter = (options: FetchAdapterOprions = { pareser: parseRaw }) => async (ctx: Context) => {
    const { headers, params: { url, ...requestParams } } = ctx
    const signal = getSignal(ctx)
    try {
        const res = await fetch(url, { ...requestParams, headers, signal })
        if (!res.ok) {
            const data = await res.text().catch(() => 'error')
            throw new Error(data)
        }
        ctx.response = res
        ctx.data = await options.pareser?.(res)
    } catch (error) {
        ctx.error = error as Error
    }
}


export function parseJson<T = unknown>(res: Response): Promise<T> {
    return res.json()
}

export function parseText(res: Response): Promise<string> {
    return res.text()
}

export function parseBlob(res: Response): Promise<Blob> {
    return res.blob()
}

export function parseRaw(res: Response): Response {
    return res
}