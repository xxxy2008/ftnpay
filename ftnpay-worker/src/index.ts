import ipDetection from "./ipDetection";

export interface Env {
  API_BASE_URL: string;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(req.url);

    // 根路径返回欢迎页面
    if (url.pathname === "/") {
      return new Response("<h1>欢迎使用智汇TTH</h1>", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // IP地址检测API
    if (url.pathname === "/api/ip-country") {
      const country = ipDetection(req);
      return new Response(JSON.stringify({ country }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // 代理其他API请求
    if (url.pathname.startsWith("/api/")) {
      const target = env.API_BASE_URL + url.pathname.replace("/api", "");
      return fetch(target, {
        method: req.method,
        headers: req.headers,
        body: req.method !== "GET" ? await req.blob() : undefined,
      });
    }

    // 其它路径404
    return new Response("Not Found", { status: 404 });
  },
};
