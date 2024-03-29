FROM node:alpine

# 容器默认时区为UTC，如需使用上海时间请启用以下时区设置命令
RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone && apk del

# 使用 HTTPS 协议访问容器云调用证书安装
# RUN apk add ca-certificates

# 安装依赖包，如需其他依赖包，请到alpine依赖包管理(https://pkgs.alpinelinux.org/packages?name=php8*imagick*&branch=v3.13)查找。
# RUN apk add --update --no-cache nodejs npm

RUN npm install -g pnpm

# # 指定工作目录
WORKDIR /app

# 拷贝包管理文件
COPY package.json /app
COPY pnpm-lock.yaml /app

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

# npm 安装依赖
RUN pnpm install

# 将当前目录（dockerfile所在目录）下所有文件都拷贝到工作目录下
COPY . /app

# 执行编译命令
RUN npm run build

# 执行启动命令
CMD ["npm", "start"]
