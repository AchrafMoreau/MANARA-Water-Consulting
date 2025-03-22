import prisma from "@/server/db";
import { NextResponse } from "next/server";


export async function GET(){

    try {
        const offers = await prisma.offer.findMany();
        return NextResponse.json({ jobs: offers }, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}