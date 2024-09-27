// import { connectToDatabase } from "@/app/lib/db";
// import User from "@/app/lib/model/user";
// import mongoose from "mongoose";
// import { getToken } from "next-auth/jwt";

export async function POST(req) {
    // await connectToDatabase();

    const { upc } = await req.json();
    const username = process.env.RHINO_SCAN_USERNAME;
    const password = process.env.RHINO_SCAN_PASSWORD;
    const APIModule = process.env.RHINO_SCAN_APIMODULE;
    const Company = "rhino";
    const url = `https://api.myglobalsecure.io/${APIModule}/${Company}/${upc}`;

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                license: "cmhpbm9saXN0ZXJzdXBlcnVzZXI=",
                version: "4.1.1"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}