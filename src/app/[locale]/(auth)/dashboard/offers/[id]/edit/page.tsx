import OfferForm from "@/components/dashboard/offers/offer-form";
import { GetOfferById, UpdateOffer } from "@/lib/actions/offer-action";
import { notFound } from "next/navigation";

export default async function EditOfferPage({ params }: { params: { id: string } }) {
  const offer = await GetOfferById(params.id)

  if (!offer) {
    notFound()
  }

  return <OfferForm 
            onSubmit={UpdateOffer}
            offer={offer} 
            isEditing={true} 
          />
}