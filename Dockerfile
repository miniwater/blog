# 第一阶段：构建阶段
FROM node:lts-alpine AS build
WORKDIR /app

# 复制依赖文件并安装
COPY package*.json ./
RUN npm install

# 复制源码并执行打包命令
COPY . .
RUN npm run build

# 第二阶段：运行
FROM caddy:alpine

# 复制静态文件
COPY --from=build /app/dist /usr/share/caddy

# 关键：直接通过命令启动，不使用外部 Caddyfile
# --root 指定静态文件目录
# --listen 指定监听端口
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":80"]

# 暴露 80 端口
EXPOSE 80
