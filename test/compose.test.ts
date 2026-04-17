import { compose } from '../src/core/compose'

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

const mw1 = async (ctx: any, next: any) => {
    ctx.log.push('mw1 start')
    await sleep(1000)
    await next()
    ctx.log.push('mw1 end')
}

const mw2 = async (ctx: any, next: any) => {
    ctx.log.push('mw2 start')
    await sleep(10)
    ctx.log.push('mw2 end')
}

const mw3 = async (ctx: any, next: any) => {
    ctx.log.push('mw3 start')
    next()
    ctx.log.push('mw3 end')
}

function run () {
    const ctx = { log: [] as string[] }

    compose(mw1, mw2, mw3)(ctx).then(data => {
        console.log(data)
    }).catch(err => {
        console.log('error', err)
    })
}

run()