"use client"
import { UpdateBrokerForm } from '@/app/api/postApi/broker'
import { SubmitButton } from '@/components/Ui/SubmitButton'
import React from 'react'
import { useFormState } from 'react-dom'
import { toast } from "sonner";

const EditBrokerModal = ({ users, onClose, setCurrentUser }) => {
    const [state, formAction] = useFormState(UpdateBrokerForm, null);

    const updatedUser=()=>{
       try{
        setCurrentUser(state.data);
        toast.success("successfully updated!")
        onClose();
       }catch{
        toast.error("failed to create!")
       }
    }
    state?.success&& updatedUser();
    
    return (
        <div className="fixed left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full bg-black/60 backdrop-blur-sm" >
            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">

                <div className="relative bg-white rounded-lg shadow ">

                    <div className="flex items-start justify-between p-5 border-b rounded-t ">
                        <h3 className="text-xl font-semibold ">
                            Edit borker
                        </h3>
                        <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="edit-user-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <form action={formAction}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                                    <input type="text" name="name" defaultValue={users.name} id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Bonnie" required />
                                </div>
                                <input type="text" name='user_id' id="user_id" required value={users._id} className='invisible' />
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input type="email" name="email" defaultValue={users.email} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="example@company.com"  />
                                </div>

                               
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                                    <input type="text" name="new-password" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="••••••••"  />
                                </div>
                               
                            </div>

                            <div className="items-center p-6 border-t mt-2 border-gray-200 rounded-b ">
                               <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default EditBrokerModal