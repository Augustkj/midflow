import { Context, Next } from "@types";

export async function transportMw(context: Context, next: Next) {
    if (context.adapter) {
        await context.adapter(context)
    }

    return next()
}