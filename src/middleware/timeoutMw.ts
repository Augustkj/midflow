import { Context, Next } from "@types";
import { addSignals } from "src/core/runtime";

export function timeoutMw(ctx: Context, next: Next) {
    const { timeout } = ctx
    console.log('timeout', timeout)
    if (!timeout) {
        return next()
    }
    const controller = new AbortController()
    const signal = controller.signal
    addSignals(ctx, signal)
    return withTimeout(next, timeout, () => controller.abort())
}

function withTimeout(nextTask: Next, time: number, abort: () => void): Promise<void> | void {
    let timer: ReturnType<typeof setTimeout>

    const t = new Promise((_, reject) => {
        timer = setTimeout(() => {
            reject(new Error('timeout error'))
            abort()
        }, time)
    })

    return Promise.race([t, nextTask()]).then(() => void 0).finally(() => {
        clearTimeout(timer)
    })
}
