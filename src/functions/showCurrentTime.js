const { app } = require("@azure/functions");

app.timer("showCurrentTime", {
    schedule: "*/30 * * * * *",
    handler: (myTimer, context) => {
        context.log(new Date().toISOString());
    },
});
