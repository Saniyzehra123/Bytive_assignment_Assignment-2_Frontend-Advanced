import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import {   Form,Col, Row, Spin,Image,Modal ,Input } from 'antd';
import { MailOutlined,PhoneOutlined ,GlobalOutlined , HeartOutlined, HeartFilled ,EditTwoTone ,DeleteFilled } from '@ant-design/icons';
import "./User.css"
// import 'antd/dist/reset.css';

export default function User( ) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
     
    const [editForm] = Form.useForm(); 
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
  
        // Generate avatars for each user
        const usersWithAvatars = data.map(user => {
          const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;
  
          return {
            ...user,
            avatarUrl
          };
        });
  
        setUsers(usersWithAvatars);
        setLoading(false);
      };
  
      fetchData();
    }, []);
 
    const handleDelete = (userId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

     
  

    const handleEditClick = (user) => {
      setSelectedUser(user);
      // form.setFieldsValue(user);
      setEditModalVisible(true);
      editForm.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website:user.website
      });
    
    };

    
  const handleEditSubmit = () => {
    const values = editForm.getFieldsValue();
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: values.name,
          email: values.email,
          phone: values.phone,
          website:values.website
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
    setEditModalVisible(false);
  };
  
    
  
    const handleEditCancel = () => {
      setEditModalVisible(false);
    };
  
   

    return (
         
           <div style={{ padding: '24px' }}>
      {loading ? (
         <div class="spinner">
         <div class="bounce1"></div>
         <div class="bounce2"></div>
         <div class="bounce3"></div>
       
        </div>
      ) : (
           
          <Row className='row'  gutter={[1, 16]}>
            {users.map(user => 

              <Col xs={24} sm={12} md={8} lg={6} xl={6}  key={user.id}>
              <UserCard user={user} handleEditClick={handleEditClick} handleDelete={handleDelete}   />
             </Col>

            )}
          </Row>
        )}
           <Modal
        title="Basic Modal"
        open={editModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEditSubmit}
       >
       <Form form={editForm}>
          <Form.Item label="Name" name="name"  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email"   rules={[{ required: true, type: 'email',  message: "Invalid email",}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone"  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="website"  rules={[{ required: true, type: 'url' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      
      </div>
  )
}
