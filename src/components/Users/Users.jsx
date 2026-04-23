import React, { use, useState } from "react";

const Users = ({usersPromise}) => {
    const initialUsers = use(usersPromise)
    const [users,setUsers] = useState(initialUsers)

// Create User
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After saving user", data);
        if(data.insertedId){
            newUser._id = data.insertedId
            const newUsers = [...users, newUser]
            setUsers(newUsers)
            alert('user added successfully!')
            e.target.reset()
        }
      });
  };

//Delete User

const handleDeleteUser = (id)=>{
  fetch(`http://localhost:3000/users/${id}`,{
    method: 'DELETE',
  })
  .then(res=>res.json())
  .then(data => {
    if(data.deletedCount){
      alert('User deleted successfully!')
      const remainingUsers = users.filter(user => user._id !== id )
      setUsers(remainingUsers)
    }
  })
}



  return (
    
    <div>
      <h3>Users: {users.length}</h3>
      <form action="" onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <p>-----------------</p>
      <div>
        {
            users.map(user =><p key={user._id}>{user.name} : {user.email} <button onClick={()=>handleDeleteUser(user._id)}>X</button></p>)
        }
      </div>
    </div>
  );
};

export default Users;
