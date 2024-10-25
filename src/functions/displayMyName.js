const { app } = require("@azure/functions");

app.http("displayMyName", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        return { body: `Hello, Supakorn Emchanon!` };
    },
});
