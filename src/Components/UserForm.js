import React from 'react'
// import axios from "axios"
import { Form, Table, Button } from 'react-bootstrap';
import UserEditForm from './UserEditForm';

const UserForm = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [userList, setUserList] = React.useState([]);
    const [editModelOpen, setEditModelOpen] = React.useState(false);
    const [clickedItem, setClickedItem] = React.useState({});

    // //Function For Show Users List
    // const showData = async () => {
    //     const response = await fetch('http://localhost:5002/api/user', {
    //         method: 'GET'
    //     })
    //     const getList = response.json();
    //     getList.then(item =>
    //         setUserList(item.result))
    // }

    // React.useEffect(() => {
    //     showData().then()
    // }, [])

    //Function For Show Users List
    const showData = async () => {
        try {
            const resp = await fetch('http://localhost:5002/api/user');
            const newResp = await resp.json();
            console.log("newResp:", newResp);
            setUserList(newResp);
        } catch (err) {
            console.log("error:", err);
        }
    }

    React.useEffect(() => {
        showData();
    },[])


    const handleCreateUser = async () => {
        let userData = {
            name: name,
            email: email,
            mobile: mobile
        }
        fetch('http://localhost:5002/api/user/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(result => {
                setName('')
                setEmail('')
                setMobile('')
                showData();
                console.log(result)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    // Function For Edit Button
    const handleEdit = (item) => {
        setClickedItem(item);
        setEditModelOpen(true);
    }
    // Function for delete button 
    const handleDelete = (item) => {
        fetch(`http://localhost:5002/api/user/${item._id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(result => {
                showData();
                console.log(result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <>
        <UserEditForm clickedItem = {clickedItem} editModelOpen = {editModelOpen} setEditModelOpen = {setEditModelOpen} showData={showData}/>

            <div style={{ backgroundColor: '#E5FFFF' }} >
                <div
                    className='container'
                    style={{ width: '700px' }}>
                        <center><h2>User Details</h2></center>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} placeholder="Enter name" onChange={(e) => { setName(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMobile">
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="number" value={mobile} placeholder="Enter mobile number" onChange={(e) => setMobile(e.target.value)} />
                        </Form.Group>

                        <Button disabled={!(name.trim().length && email.trim().length && mobile.trim().length)} variant="primary" type="button" onClick={() => handleCreateUser()}>
                            Submit
                        </Button>
                </div><br />
                {userList.length?
                <div className='container'>
                <h2>List</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile no.</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((item, i) => {
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td><Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={() => handleDelete(item)}>Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>    
                :null}

                
            </div>

        </>
    )
}


export default UserForm
