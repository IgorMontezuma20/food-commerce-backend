import { PrismaClient } from "@prisma/client";
import { CustomerData } from "../interfaces/CustomerData";
import { PaymentData } from "../interfaces/PaymentData";
import { SnackData } from "../interfaces/SnackData";

export default class CheckoutService{
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient();
    }

    async process(
        cart: SnackData[], 
        customer: CustomerData, 
        payment: PaymentData
    ) {
        
        const snacks = await this.prisma.snack.findMany({
            where: {
                id: {
                    in: cart.map((snack) => snack.id),
                }
            }
        })

        //console.log('snacks', snacks)

        const snacksInCart = snacks.map<SnackData>((snack) => ({
            ...snack,
            price: Number(snack.price),
            quantity: cart.find((item) => item.id === snack.id)?.quantity!,
            subTotal: cart.find((item) => item.id === snack.id)?.quantity! * Number(snack.price)
        }))
        console.log('snacksInCart', snacksInCart)
    }

}