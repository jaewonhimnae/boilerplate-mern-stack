import React from 'react'
import { ShoppingOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> Shopping Online  <ShoppingOutlined /></p>
           <sub>Author by Nhat Nguyen</sub>
        </div>
    )
}

export default Footer
