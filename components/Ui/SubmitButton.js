'use client'
import Loader from '@/common/Loader'
import { useFormStatus } from 'react-dom'
export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending} aria-disabled={pending} className="text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary/80 dark:focus:ring-primary" type="submit">
            {pending ? <Loader /> : "Save all"}
        </button>
    )
}