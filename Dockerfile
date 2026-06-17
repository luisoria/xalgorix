FROM golang:1.24-alpine AS build
RUN apk add --no-cache git make
WORKDIR /src
COPY . .
RUN GOPROXY=direct go build -o /out/xalgorix ./cmd/xalgorix

FROM alpine:3.20
RUN apk add --no-cache ca-certificates chromium nss freetype harfbuzz ttf-freefont
COPY --from=build /out/xalgorix /usr/local/bin/xalgorix
EXPOSE 9137
ENV XALGORIX_BIND=0.0.0.0
ENV XALGORIX_PORT=9137
ENTRYPOINT ["xalgorix"]
CMD ["--web", "--port", "9137"]
