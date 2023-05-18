import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form} from 'react-bootstrap';

const UserEditForm = (props) => {
    const [name, setName] = useState(props.clickedItem.name);
    const [email, setEmail] = useState(props.clickedItem.email);
    const [mobile, setMobile] = useState(props.clickedItem.mobile);
///////////////////////
   useEffect(()=>{
    setName(props.clickedItem.name);
    setEmail(props.clickedItem.email);
    setMobile(props.clickedItem.mobile);
   },[props.clickedItem._id])

    const handleClose = () => props.setEditModelOpen(false);
    console.log(props.clickedItem.name)
    console.log(name)

    const handleSave=()=>{
        let userData = {
            name: name,
            email: email,
            mobile: mobile
        }
        fetch(`http://localhost:5002/api/user/${props.clickedItem._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(result => {
                props.showData();
                handleClose();
                console.log(result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <Modal show={props.editModelOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserEditForm
