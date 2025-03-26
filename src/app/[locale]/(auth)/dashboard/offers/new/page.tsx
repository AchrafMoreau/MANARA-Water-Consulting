import OfferForm from "@/components/dashboard/offers/offer-form";
import { CreateOffer } from "@/lib/actions/offer-action";

export default async function Page(){

    return(
        <div className="mx-auto w-full py-6">
            <OfferForm 
                onSubmit={CreateOffer}
            />
        </div>
    )
}