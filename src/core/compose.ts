/**
 * Compose middleware chain (koa style)
 */
import { Context, Middleware } from "@types";

export function compose(...middlewares: Middleware[]) {
    for (const mw of middlewares) {
        if (typeof mw !== 'function') throw new Error('Middleware must be a function')
    }
    return function dispatch(ctx: Context) {
        
        let index = -1
        async function run (idx: number) {
            let callResolved = false
            let callRunner = false
            if (idx <= index) throw new Error('next() called multiple times')
            
            index = idx

            const mw = middlewares[idx]

            if (!mw) return ctx

            const nextProxy = async () => {
                callRunner = true
                try {
                    await run(idx + 1)
                } finally {
                    callResolved = true
                }
            }

            await mw(ctx, () => nextProxy())
            if (!callResolved && callRunner) throw new Error('next() missing await or return')

            return ctx
        }

        return run(0)
    }
}