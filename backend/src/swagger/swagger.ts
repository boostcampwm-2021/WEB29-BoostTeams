const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "BoostTeams",
    description: "Team Communication Platform",
  },
  host: "localhost:4000",
  schemes: ["https"],
  tags: [
    {
        "name": "Auth",
        "description": "인증 관련 API - /api/auth"
    },
    {
        "name": "Schedule",
        "description": "팀 공유 일정 관련 API - /api/schedules"
    },
    {
        "name": "Team",
        "description": "팀 관련 API - /api/teams"
    },
    {
        "name": "User",
        "description": "유저 관련 API - /api/users"
    },
],
};

const outputFile = "src/swagger/swagger-output.json";
const endpointsFiles = [
  "src/routes/auth-router.ts",
  "src/routes/schedule-router.ts",
  "src/routes/team-router.ts",
  "src/routes/user-router.ts",
];

swaggerAutogen(outputFile, endpointsFiles, doc);