import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData()
    console.log(user);

    const handleUpdateUser = (e)=>{
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;

        const updatedUser = {name,email}

        //Send data to te server
        fetch(`http://localhost:3000/users/${user._id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount){
                alert('User Info Updated Successfully')
            }
        })
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h3>Edit user</h3>
            <form action="" onSubmit={handleUpdateUser}>
                <input type="text" name="name" id="" defaultValue={user.name} /><br /><br />
                <input type="email" name="email" id="" defaultValue={user.email} /><br /><br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;