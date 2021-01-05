export interface Config {
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number;
    ispool?: boolean;
    waitConnection?: boolean;
    connectionLimit?: number;
    queueLimit?: number;
}
export interface AnyOpt {
    [props: string]: any;
}
