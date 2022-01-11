# TODO

1. 封装获取配置文件的方法

```ts
// src\main.ts
const ENABLE_DOCUMENTATION = configService.get<string>('ENABLE_DOCUMENTATION');
if (ENABLE_DOCUMENTATION) {
  setupSwagger(app);
}
```

2. user.roles 修改为枚举数组
3. 日志模块
4. 配置模块
