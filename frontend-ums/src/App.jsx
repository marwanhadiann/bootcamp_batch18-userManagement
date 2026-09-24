import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import DetailUsers from "./DetailUsers";
import UserForm from "./Form";
import SearchBar from "./SearchBar";
import Clock from "./Clock";


function App() {
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState(null)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const usersPerPage = 6
  const [totalUsers, setTotalUsers] = useState(0)

  const inputRef = useRef(null)
  const timerRef = useRef(null)

  const fetchUsers = (query = '', page = 1) => {
    setLoading(true)
    setError(false)

    axios
      .get(`http://localhost:3000/api/users?search=${encodeURIComponent(query)}&page=${page}&limit=${usersPerPage}`)
      .then((res) => {
        setTimeout(() => {
          setUsers(res.data.data)
          setCurrentPage(res.data.pagination.currentPage)
          setTotalPage(res.data.pagination.totalPage)
          setTotalUsers(res.data.pagination.totalUsers)
          setLoading(false)
        }, 1000);
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
        console.error('error fetching user', error)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = () => {
    const query = inputRef.current ? inputRef.current.value : ''

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      console.log('mengirim query ke be :', query)
      fetchUsers(query, 1)
    }, 500);
  }

  const handleAddUser = (newUser) => {
    setUsers((prevUser) => [newUser, ...prevUser])
  }

  return (
    <div className="w-250 justify-self-center">
      <h1 className="text-3xl font-bold text-center m-5">User Management System</h1>
      <p className="text-center">total user: <span className="font-semibold underline"> {totalUsers} </span>
      </p>
      <div className="border w-15 rounded-md bg-sky-200">
        <Clock />
      </div>

      <SearchBar inputRef={inputRef} onSearch={handleSearch} />

      <button
        onClick={() => setShow(true)}
        className="bg-sky-500 p-1 m-5 rounded hover:bg-sky-600 text-white">Add User +</button>


      {/* tampilan data user dengan state loading dan error */}
      <div className="grid grid-cols-3 justify-center gap-6">
        {loading ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">
              Memuat data user...</p>
          </div>
        ) : error ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-12">
            <p className="text-red-500 font-medium">
              Gagal mengambil data user.
            </p>
            <button
              onClick={() => fetchUsers()}
              className="mt-3 bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-600">
              Coba Lagi!
            </button>
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <UserCard
              user={user}
              key={user.id}
              onDetail={() => setSelectUser(user)} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 py-4">
            User tidak ditemukan.
          </p>
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && totalPage > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => {
              const query = inputRef.current ? inputRef.current.value : ''
              fetchUsers(query, currentPage - 1)
            }
            }
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>

          <span className="font-semibold">
            page {currentPage} of {totalPage}
          </span>

          <button
            onClick={() => {
              const query = inputRef.current ? inputRef.current.value : ''
              fetchUsers(query, currentPage + 1)
            }}
            disabled={currentPage === totalPage}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      )}

      {/* Detail Users */}
      {selectUser && (
        <DetailUsers
          user={selectUser}
          onClose={() => setSelectUser(null)} />
      )}
      {/* Form add users */}
      {show && (
        <UserForm onClose={() => setShow(false)}
          onAddUser={handleAddUser} />
      )}
    </div>
  )
}

export default App