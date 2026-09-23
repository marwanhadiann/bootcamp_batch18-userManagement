function UserCard({ user, onDetail }) {


    return (
        <>
            <div className="bg-white border rounded-lg p-3 shadow-xl">
                <p className="font-bold text-center text-lg">{user.name}</p>

                <button
                    onClick={onDetail}
                    className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 hover:cursor-pointer">
                    Lihat Detail</button>
            </div>

        </>
    )
}

export default UserCard