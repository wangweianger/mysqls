declare global {
  interface global {
    this: any;
  }
}

export {} // 注意: 修改"全局声明"必须在模块内部, 所以至少要有 export{}字样
