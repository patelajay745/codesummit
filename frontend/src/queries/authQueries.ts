import { api } from "@/api/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

const sendEmail = async ({ email }: { email: string }) => {
    const res = await api.post('/auth/email-send/', { email })
    console.log("email sending res", res)
    return res.data.message
}

export const useEmailSend = () => useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
        toast.success(data)
    },
    onError: (error) => {
        let message = 'Something went wrong';

        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            if (status === 429) {
                message = 'Too many requests. Please try again later.';
            } else {
                message = error.response?.data?.message || message;
            }
        } else if (error instanceof Error) {
            message = error.message;
        }
        toast.error(message)
    }
})