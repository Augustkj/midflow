export function mergeSignal(...signals: Array<AbortSignal | null | undefined>): AbortSignal | null | undefined {
    const validateSignals = signals.filter(Boolean)

    if (validateSignals.length === 0) return undefined
    if (validateSignals.length === 1) return validateSignals[0]

    const controller = new AbortController()
    const merSignal = controller.signal
    const abort = () => controller.abort()

    for (const signal of validateSignals) {
        if (signal?.aborted) {
            continue
        }
        signal?.addEventListener('abort', abort, { once: true })
    }

    return merSignal
}

