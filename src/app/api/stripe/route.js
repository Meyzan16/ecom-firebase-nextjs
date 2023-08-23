import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe =  require('stripe')('sk_test_51NeujeHeMgTebgqpofG2W0rLkv6fqHRdmmHe0kDf78ALzmxDnZ7Wl3xs8dQ9q73F0dgsTp0XZemI86PxIXFCsApK001TFUuTcg')

export const dynamic = 'force-dynamic';

export async function POST(req){
    try {

        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const res = await req.json();
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types : ["card"],
                line_items : res,
                mode : 'payment',
                success_url : `${process.env.NEXTAUTH_URL_INTERNAL}/checkout` + "?status=success",
                cancel_url : `${process.env.NEXTAUTH_URL_INTERNAL}/checkout` + "?status=cancel"
            });
    
            return NextResponse.json({
                success : true,
                id : session.id,
            })
            
        }else{
            return NextResponse.json({
                success : false,
                message : 'You are not authenticated'
            })
        }

        
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status : 500,
            success : false,
            message : 'Something went wrong ! please try again'
        })
    }
}