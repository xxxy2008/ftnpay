import ipDetection from "./ipDetection";

export interface Env {
  API_BASE_URL: string;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(req.url);

    // IP國別識別
    if (url.pathname === "/api/ip-country") {
      const country = ipDetection(req);
      return new Response(JSON.stringify({ country }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // API 轉發
    if (url.pathname.startsWith("/api/")) {
      const target = env.API_BASE_URL + url.pathname.replace("/api", "");
      return fetch(target, {
        method: req.method,
        headers: req.headers,
        body: req.method !== "GET" ? await req.blob() : undefined,
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
