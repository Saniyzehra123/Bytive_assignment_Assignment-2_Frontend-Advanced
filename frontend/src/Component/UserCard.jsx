import React, { useState } from 'react'
import {   Form, Card, Col, Row, Spin,Image,Modal ,Input } from 'antd';
import { MailOutlined,PhoneOutlined ,GlobalOutlined , HeartOutlined, HeartFilled ,EditOutlined ,DeleteFilled } from '@ant-design/icons';

export default function  UserCard({user,handleEditClick,handleDelete}) {

const [clicked,setClicked]=useState(false)

const handelClick=()=>{
  setClicked(!clicked)
}
  return (
    <Card className='card'>
                <div className="avatar"> 
                
                 <Image  preview={false} className='img'width={200} src={user.avatarUrl}  />   
                  </div>
                
                   
                  <h3 className='user'>  {user.name}</h3>
                  <div className='user-id'> 
                   <div> <MailOutlined />   <p>  {user.email}</p></div>  
                   <div> <PhoneOutlined /> <p> {user.phone}</p></div>  
                    <div> <GlobalOutlined /> <p> {user.website}</p></div> 
                    </div>
                    <div className='user-icons' onClick={handelClick}>
                     
                        {clicked ? (
                          <HeartFilled style={{ color: 'red' }} />
                                 ) : (
                             <HeartOutlined   style={{ color: 'red' }} />
                            )}
                        | <EditOutlined className='edit'  key="edit" onClick={() =>handleEditClick(user)} /> | <DeleteFilled className='edit' key="delete"    onClick={() => handleDelete(user.id)} /></div>
            
                </Card>
  )
}
