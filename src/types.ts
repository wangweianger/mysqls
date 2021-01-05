
export interface Config {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
  ispool?: boolean;  // 是否使用连接池链接
  waitConnection?: boolean; // 是否等待链接  
  connectionLimit?: number; // 连接池数
  queueLimit?: number; // 排队限制 
}


export interface AnyOpt {
  [props:string]: any;
}