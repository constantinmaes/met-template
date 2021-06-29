import { Service } from 'typedi';
import Redis from 'ioredis';

@Service()
export class CacheService {
    #client: Redis.Redis;
    #default_ttl: number;

    constructor() {
        this.connect();
        this.#default_ttl = parseInt(process.env.REDIS_TTL) || 600;
    }

    async clear() {
        (await this.keys()).forEach((k) => this.#client.del(k));
    }

    async get(name: string) {
        const data = await this.#client.get(name);
        return JSON.parse(data);
    }

    async has(name: string) {
        return (await this.keys()).findIndex((k) => k === name) !== -1;
    }

    async remember(name: string, cb: Function, ttl = this.#default_ttl) {
        const data = await this.get(name);
        if (data) {
            return data;
        } else {
            const value = await cb();
            return this.save(name, value);
        }
    }

    save(key: string, value: any, ttl = this.#default_ttl) {
        return this.#client.set(key, JSON.stringify(value), 'ex', ttl);
    }

    private connect() {
        const db = parseInt(process.env.REDIS_DB) || 0;
        const host = process.env.REDIS_HOST || '127.0.0.1';
        const port = parseInt(process.env.REDIS_PORT) || 6379;
        this.#client = new Redis({
            db,
            host,
            port,
        });
    }

    private async keys() {
        return await this.#client.keys('*');
    }
}
