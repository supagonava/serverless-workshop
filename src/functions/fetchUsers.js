const { app } = require("@azure/functions");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ttm-iservice",
});

// ฟังก์ชันสำหรับเชื่อมต่อกับฐานข้อมูล
const connectDB = async () => {
    try {
        await connection.connect();
        console.log("เชื่อมต่อกับฐานข้อมูลสำเร็จ");
    } catch (error) {
        console.error("ไม่สามารถเชื่อมต่อกับฐานข้อมูล:", error);
        process.exit(1);
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลทั้งหมดจากตาราง
const getAllUsers = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM tb_admin");
        return rows;
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        throw error;
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลด้วยเงื่อนไข
const getUserById = async (userId) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM tb_admin WHERE id = ?", [userId]);
        return rows[0];
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        throw error;
    }
};

app.http("fetchUsers", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        await connectDB();

        // ดึงข้อมูลทั้งหมด
        const allUsers = await getAllUsers();
        console.log("ผู้ใช้ทั้งหมด:", allUsers);

        // ปิดการเชื่อมต่อ
        connection.end();

        return { body: JSON.stringify(allUsers), headers: { "content-type": "application/json" } };
    },
});
