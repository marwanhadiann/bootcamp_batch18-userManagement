import { useState } from "react"

function DetailUsers({ user, onClose }) {

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center ">
            <div className="bg-sky-100 border w-96 rounded-xl shadow-xl p-6">

                <div className=" p-6 justify-self-center">
                    <h2 className="text-2xl font-bold">Detail User</h2>
                </div>

                <div className="space-y-3">
                    <p className="font-semibold">{user.name}</p>
                    <hr className="border-gray-300 my-2" />
                    <p><span className={`${user.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-600'} font-bold text-sm px-1.5 rounded-full`}>{user.status ? 'ACTIVE' : 'NON-ACTIVE'}</span></p>
                    <p><span className="font-semibold">Email : </span>{user.email}</p>
                    <p><span className="font-semibold">Phone : </span>{user.phone}</p>
                    <p><span className="font-semibold">Role : </span>{user.role}</p>


                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 hover:cursor-pointer"
                >Tutup</button>
            </div>
        </div>
    )
}

export default DetailUsers