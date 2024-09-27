import { connectToDatabase } from "@/app/lib/db";
import ScanDetail from "@/app/lib/model/scandetails";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
    // Connect to the database
    await connectToDatabase();
    
    // Parse the request data
    const { upc } = await req.json();

    // Get the logged-in user ID using next-auth JWT
    const token = await getToken({ req });
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    // Prepare the external API request details
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
        // Make the external API request
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
        
        // Check if a record with the same userId and identifier exists
        const existingScanDetail = await ScanDetail.findOne({ 
            userId: token.id, 
            identifier: data.Identifier 
        });

        if (existingScanDetail) {
            // If record exists, increment the quantity
            existingScanDetail.quantity += 1;
            await existingScanDetail.save();
            return new Response(JSON.stringify(existingScanDetail), { status: 200 });
        } else {
            const scanDetails = {
                userId: token.id, 
                title: data.Title,
                desc: data.Desc,
                model: data.Model,
                prices: data.Prices,
                images: data.Images,
                identifier: data.Identifier,
                quantity: 1 // Set initial quantity to 1
            };

            const newScanDetail = new ScanDetail(scanDetails);
            await newScanDetail.save();
            return new Response(JSON.stringify(newScanDetail), { status: 200 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
