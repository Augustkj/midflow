import { Context } from "@types"
import { mergeSignal } from "src/utils/mergeSignal"

const runtime_key = Symbol('runtime_key')

class RuntimeState {
    signals: Array<AbortSignal> = []

    addSignals(...signal: AbortSignal[]) {
        this.signals.push(...signal)
    }

    getSignal() {
        return mergeSignal(...this.signals)
    }
}

function ensuranceRuntime(ctx: Context): RuntimeState {
    const target = ctx as Context & { [runtime_key]: RuntimeState }

    if (!target[runtime_key]) {
        target[runtime_key] = new RuntimeState()
    }

    return target[runtime_key]
}

export function addSignals(ctx: Context, ...signals: AbortSignal[]) {
    ensuranceRuntime(ctx).addSignals(...signals)
}

export function getSignal(ctx: Context) {
    return ensuranceRuntime(ctx).getSignal()
}
