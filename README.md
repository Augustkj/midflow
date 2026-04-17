# midflow

一个基于 **compose 中间件模型** 的 HTTP 请求库，支持 **可插拔 transport adapter**。

midflow 将请求流程拆分为 **middleware → transport → adapter** 三层结构，使请求逻辑更加清晰、可扩展。

默认内置 `fetch` adapter，同时允许开发者自定义 adapter 或扩展 middleware。

---

## 特性

- 基于 **compose** 的洋葱模型中间件
- 支持 **可插拔 adapter**
- 内置 **fetch adapter**
- 支持 **timeout middleware**
- 内置 **AbortSignal runtime 管理**
- 支持 **响应 parser**
- 请求生命周期可自由扩展

---

## 快速开始

```ts
import { createClient } from 'midflow'

const client = createClient({
  timeout: 5000
})

const ctx = await client.request({
  url: 'https://httpbin.org/get',
  method: 'GET'
})

console.log(ctx.data)

```
---

## 架构设计

midflow 将请求流程拆分为三个部分：

1. Middleware

负责扩展请求生命周期，例如：
-	timeout
- retry
- logging
- auth
- response transform

Middleware 使用 compose 洋葱模型执行。

> middleware  
↓  
middleware  
↓  
transportMw  
↓  
adapter

2. Transport Middleware

Transport middleware 负责在中间件链中调度 adapter。

它的职责是：
- 调用 adapter
- 写入 response
- 解析 response

3. Adapter

Adapter 负责 真正执行请求。

默认 adapter 使用 fetch 实现。

```ts
    createFetchAdapter()
```

开发者也可以实现自己的 adapter，例如：
- axios adapter
- node http adapter
- mock adapter


Middleware 示例

开发者也可以实现自己的 adapter，例如：
- axios adapter
- node http adapter
- mock adapter

```ts
client.client({
  url: 'https://api.test.com',
  parser: res => res.json()
})
```

---

### Inspiration

midflow 的设计灵感来自真实项目中的请求层实践。

在大型项目或多包工程中，请求层通常会不断叠加各种能力，例如：
- timeout
- retry
- auth
- logging
- response transform

当这些逻辑仅依赖拦截器机制时，随着项目复杂度增加，流程控制和 transport 实现往往会逐渐耦合。

midflow 尝试通过更清晰的结构来组织这些能力：
- middleware 负责流程控制
- adapter 负责请求执行
- runtime helper 负责内部协作（例如 AbortSignal 管理）