import { v4 as uuidv4 } from 'uuid'
import lodashi from "lodash"
import momenti from 'moment'

export const isNode: boolean = typeof process === 'object'
export const env: NodeJS.ProcessEnv = isNode ? process.env || {} : {}
export const isProd: boolean = env.NODE_ENV === 'production'
export const isDev: boolean = env.NODE_ENV === 'development'
export const dateFormat: string = "YYYY-MM-DD HH:mm:ss.SSS"
export const lodash: lodashi.LoDashStatic = lodashi
export const moment = momenti

export const Exec = setImmediate
export const Loop = setInterval
export const Delay = setTimeout
export const Uid = (): string => uuidv4()

/**
 * @returns "YYYY-MM-DD HH:mm:ss.SSS"
 */
export const Now = (): string => moment().format(dateFormat)

/**
 * Parses String -> JSON
 * @param e 
 * @returns JSON
 */
export const Jfy = (e: any): {} => typeof e === 'string' ? JSON.parse(e) : e

/**
 * Parses JSON -> String
 * @param e 
 * @returns String
 */
export const Sfy = (e: any): string => typeof e === 'string' ? e : JSON.stringify(e)

/**
 * Generates random numbers between 0 -> 100
 * Could possibly be Int or Float
 * @returns Number
 */
export const Rnd = (): number => Math.ceil(Math.random() * 10)

/**
 * Useful for computing time complexity
 * Example: ???
 * @param hrtime
 * @returns 
 */
export const Sec = (hrtime: [number, number]): string => (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3)

/**
 * Waits Asynchronously [ Doesn't block Event-Loop ]
 * @param ms 
 * @returns true<Boolean>
 */
export const AsyncWait = (ms: number): Promise<boolean> => new Promise((res) => Delay(() => res(true), ms))

/**
 * Waits Synchronously [ Blocks the Event-Loop ]
 * @param ms
 */
export const SyncWait = (ms: number) => {
    let start = Date.now(), now = start
    while (now - start < ms) { now = Date.now() }
}

/**
 * Encodes ENV
 * @param _env 
 * @param key 
 * @returns 
 */
export const encodeENV = (_env: any = {}, key: string = 'u_') => {
    const encode: any = {}
    for (const x in _env)
        encode[`u_${x}`] = _env[x]
    return encode
}

/**
 * Decodes ENV from Process.ENV
 * @param key Starts String
 * @returns 
 */
export const decodeENV = (key: string = 'u_') => {
    const decode: any = {}
    for (const x in env)
        if (x.indexOf(key) === 0)
            decode[x.replace(key, '')] = env[x]?.indexOf(',') !== -1 ? env[x]?.split(',') : env[x]
    return decode
}

/**
 * JWT to JSON only works on NodeJS
 * @param token
 * @returns 
 */
export const parseJwt = (token: string) => {

    try {

        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

    } catch (err) { return null }

}