import { useState } from "react";
import UserCard from "./UserCard";
import { useEffect } from "react";
import DetailUsers from "./DetailUsers";
import UserForm from "./Form";

// const user = {
//   name: 'John Doe',
//   email: 'john@example.com'
// };

function App() {
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState(null)

  const [show, setShow] = useState(false)

  const handleAddUser = (newUser) => {
    setUsers((prevUser) => [newUser, ...prevUser])
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="w-250 justify-self-center">
      <h1 className="text-3xl font-bold text-center m-5">User Management System</h1>
      <p className="text-center">total user: <span className="font-semibold underline"> {users.length} </span>
      </p>
      <br />
      <button
        onClick={() => setShow(true)}
        className="bg-sky-500 p-1 m-5 rounded hover:bg-sky-600 text-white">Add User +</button>

      <div className="grid grid-cols-3 justify-center gap-6">
        {users.map((user) => (
          <UserCard
            user={user}
            key={user.id}
            onDetail={() => setSelectUser(user)} />
        ))}
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