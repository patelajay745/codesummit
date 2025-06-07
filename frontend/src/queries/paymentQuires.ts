import { api } from "@/api/client"
import { purchaseType } from "@/pages/Premium"
import { useMutation } from "@tanstack/react-query"

const checkout = async (data: purchaseType) => {
    const res = await api.post(`/payment/`, { items: [data] })

    return res.data
}

export const useCheckout = () => useMutation({
    mutationFn: checkout,
    mutationKey: ["payment"],

})

const fulfillCheckout = async (id: string) => {
    const res = await api.post(`/payment/fulfillCheckout/${id}`)
    return res.data
}

export const useFullFillCheckout = () => useMutation({
    mutationFn: fulfillCheckout,
})