# 1. node 이미지 사용
FROM node:16-alpine

# 작업 폴더를 만들고 npm 설치
RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
WORKDIR /home/app
ENV PATH /home/app/node_modules/.bin:$PATH
COPY package.json /home/app/package.json
RUN yarn install
RUN npm install -g react-scripts

# 소스를 작업폴더로 복사하고 빌드
ENV GENERATE_SOURCEMAP=false
#ENV NODE_OPTIONS=--max-old-space-size=2048
COPY . /home/app
COPY run.sh /home/app/run.sh
RUN chmod 764 run.sh
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "/home/app/run.sh"]

#FROM nginx:latest
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
#RUN rm -rf /etc/nginx/conf.d
#COPY conf /etc/nginx

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
#COPY --from=builder /home/app/build /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행
#EXPOSE 8088
#CMD ["nginx", "-g", "daemon off;"]