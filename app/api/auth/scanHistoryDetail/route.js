import { connectToDatabase } from "@/app/lib/db";
import ScanDetail from "@/app/lib/model/scandetails";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
    await connectToDatabase();

    const token = await getToken({ req });

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const scanDetails = await ScanDetail.find({ userId: token.sub }).exec();
        
        return new Response(JSON.stringify(scanDetails), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
