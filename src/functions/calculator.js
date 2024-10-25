const { app } = require("@azure/functions");

app.http("calculator", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        // context.log(`Http function processed request for url "${request.url}"`);
        const bodyJson = JSON.parse(await request.text());
        context.log(`body : ${bodyJson}`);
        return { body: JSON.stringify({ sum: bodyJson["a"] + bodyJson["b"] }), headers: { "content-type": "application/json" } };
    },
});
