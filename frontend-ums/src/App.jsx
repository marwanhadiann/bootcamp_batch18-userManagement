import { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useEffect } from "react";
import DetailUsers from "./DetailUsers";
import UserForm from "./Form";
import SearchBar from "./SearchBar";

// const user = {
//   name: 'John Doe',
//   email: 'john@example.com'
// };

function App() {
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState(null)

  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')

  const handleAddUser = (newUser) => {
    setUsers((prevUser) => [newUser, ...prevUser])
  }

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users')
      .then((res) => {
        console.log('data dari backend: ', res.data)
        setUsers(res.data)
      })
      .catch((error) => {
        console.error('error fetching user', error)
      })
  }, [])

  const filterUsers = users.filter((user) => {
    if (!search || !search.trim()) return true
    const cleanSearch = search.trim().toLowerCase()
    const userName = user && user.name ? String(user.name).trim().toLowerCase() : ''
    return userName.includes(cleanSearch)
  })

  return (
    <div className="w-250 justify-self-center">
      <h1 className="text-3xl font-bold text-center m-5">User Management System</h1>
      <p className="text-center">total user: <span className="font-semibold underline"> {users.length} </span>
      </p>

      <SearchBar search={search} setSearch={setSearch} />

      <button
        onClick={() => setShow(true)}
        className="bg-sky-500 p-1 m-5 rounded hover:bg-sky-600 text-white">Add User +</button>


      <div className="grid grid-cols-3 justify-center gap-6">
        {filterUsers.length > 0 ? (

          filterUsers.map((user) => (
            <UserCard
              user={user}
              key={user.id}
              onDetail={() => setSelectUser(user)} />
          ))) : (
          <p className="col-span-3 text-center text-gray-500 py-4">
            User dengan nama "{search}" tidak ditemukan.
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