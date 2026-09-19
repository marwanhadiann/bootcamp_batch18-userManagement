import { useState } from "react";

function UserForm({ onClose, onAddUser }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState({})

    async function handleSubmit(event) {
        event.preventDefault();

        setError({})
        const newUser = {
            name,
            email,
            phone,
            role,
            status
        }

        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            const data = await res.json()

            if (!res.ok) {
                setError({
                    [data.field]: data.message
                })
                return
            }
            onAddUser(data)
            onClose()
        } catch (error) {
            console.error(error)

            setError({
                general: 'terjadi kesalahan pada server'
            })
        }

    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            {/* Popup */}
            <div className="bg-white rounded-lg w-100 p-5 shadow-lg">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        Add User
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Input Name */}
                    <label
                        htmlFor="name"
                        className="block mb-1"
                    >Name
                        <span className="text-red-500 font-semibold"> *</span>
                    </label>

                    <input
                        id="name"
                        className={`border rounded-lg w-full p-2 ${error.name ? 'border-red-600' : ''}`}
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value)
                            setError(prev => ({
                                ...prev, name: ''
                            }))
                        }}
                        placeholder="Masukkan nama"
                    />
                    {error.name && (
                        < p className='text-red-500 text-sm mt-1'>
                            {error.name}
                        </p>
                    )}

                    {/* Input Email */}
                    <label
                        htmlFor="email"
                        className="block mb-1"
                    >Email
                    </label>

                    <input
                        id="email"
                        className={`border rounded-lg w-full p-2 ${error.email ? 'border-red-600' : ''}`}
                        type="text"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                            setError(prev => ({ ...prev, email: '' }))
                        }}
                        placeholder="Masukkan email"
                    />

                    {error.email && (
                        < p className='text-red-500 text-sm mt-1'>
                            {error.email}
                        </p>
                    )}

                    {/* Input Phone */}
                    <label
                        htmlFor="phone"
                        className="block mb-1"
                    >Phone
                        <span className="text-red-500 font-semibold"> *</span>
                    </label>

                    <input
                        id="phone"
                        className={`border rounded-lg w-full p-2 ${error.phone ? 'border-red-600' : ''}`}
                        type="text"
                        value={phone}
                        onChange={(event) => {
                            setPhone(event.target.value)
                            setError(prev => ({ ...prev, phone: '' }))
                        }}
                        placeholder="Masukkan phone"
                    />
                    {error.phone && (
                        < p className='text-red-500 text-sm mt-1'>
                            {error.phone}
                        </p>
                    )}

                    {/* Input Role */}
                    <label
                        htmlFor="role"
                        className="block mb-1"
                    // defaultValue=''
                    >Role
                        <span className="text-red-500 font-semibold"> *</span>
                    </label>

                    <select
                        name="role"
                        id="role"
                        className={`border rounded-lg w-full p-2 ${error.role ? 'border-red-600' : ''}`}
                        value={role}
                        onChange={(event) => {
                            setRole(event.target.value)
                            setError(prev => ({ ...prev, role: '' }))
                        }}>
                        <option value='' disabled>Select Role</option>
                        <option value="user">USER</option>
                        <option value="admin">ADMIN</option>
                    </select>
                    {error.role && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.role}
                        </p>
                    )}

                    {/* Input Status */}
                    <label
                        htmlFor="status"
                        className="block mb-1"
                    // defaultValue=''
                    >Status
                        <span className="text-red-500 font-semibold"> *</span>
                    </label>

                    <select
                        name="status"
                        id="status"
                        className={`border rounded-lg w-full p-2 ${error.status ? 'border-red-600' : ''}`}
                        value={status}
                        onChange={(event) => {
                            setStatus(event.target.value)
                            setError(prev => ({ ...prev, status: '' }))
                        }}>
                        <option value="" disabled>Select Status</option>
                        <option value="true">ACTIVE</option>
                        <option value="false">NON-ACTIVE</option>
                    </select>

                    {error.status && (
                        < p className='text-red-500 text-sm mt-1'>
                            {error.status}
                        </p>
                    )}


                    <div className="flex justify-end gap-2 mt-4">

                        {/* Cancel */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                        >Cancel
                        </button>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600"
                        >Submit
                        </button>

                    </div>
                </form>
            </div>
        </div >
    )
}

export default UserForm