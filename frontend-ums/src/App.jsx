import { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useEffect } from "react";
import DetailUsers from "./DetailUsers";
import UserForm from "./Form";
import SearchBar from "./SearchBar";
import { useRef } from "react";
import Clock from "./Clock";


function App() {
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState(null)
  const [show, setShow] = useState(false)

  const inputRef = useRef(null)
  const timerRef = useRef(null)

  const fetchUsers = (query = '') => {
    axios
      .get(`http://localhost:3000/api/users?search=${encodeURIComponent(query)}`)
      .then((res) => {
        console.log('data dari backend: ', res.data)
        setUsers(res.data)
      })
      .catch((error) => {
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
      fetchUsers(query)
    }, 500);
  }

  const handleAddUser = (newUser) => {
    setUsers((prevUser) => [newUser, ...prevUser])
  }

  return (
    <div className="w-250 justify-self-center">
      <h1 className="text-3xl font-bold text-center m-5">User Management System</h1>
      <p className="text-center">total user: <span className="font-semibold underline"> {users.length} </span>
      </p>
      <div className="border w-15 rounded-md bg-green-200">
        <Clock />
      </div>

      <SearchBar inputRef={inputRef} onSearch={handleSearch} />

      <button
        onClick={() => setShow(true)}
        className="bg-sky-500 p-1 m-5 rounded hover:bg-sky-600 text-white">Add User +</button>


      <div className="grid grid-cols-3 justify-center gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              user={user}
              key={user.id}
              onDetail={() => setSelectUser(user)} />
          ))) : (
          <p className="col-span-3 text-center text-gray-500 py-4">
            User tidak ditemukan.
          </p>
        )}
      </div>

      {selectUser && (
        <DetailUsers
          user={selectUser}
          onClose={() => setSelectUser(null)} />
      )}
      {show && (
        <UserForm onClose={() => setShow(false)}
          onAddUser={handleAddUser} />
      )}
    </div>
  )
}

export default App