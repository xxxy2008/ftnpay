import { serve } from "std/http/server.ts";
import React from "react";
import { renderToString } from "react-dom/server";
import PayPage from "./pay";

serve((req) => {
  const html = `
    <!DOCTYPE html>
    <html lang="zh">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>支付页面</title>
    </head>
    <body style="background-color:#f7f7f7; margin:0; padding:20px;">
      <div id="root">${renderToString(React.createElement(PayPage))}</div>
    </body>
    </html>
  `;
  return new Response(html, { headers: { "content-type": "text/html" } });
});
