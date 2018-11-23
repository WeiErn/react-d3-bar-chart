import React from 'react';
import './Navbar.css';

const Navbar = ({chooseType}) => {

    return (
        <div>
            <ul>
                <li onClick={() => {chooseType('Confidentiality')}}>Confidentiality</li>
                <li onClick={() => {chooseType('Documents')}}>Documents</li>
                <li onClick={() => {chooseType('Languages')}}>Languages</li>
            </ul>
        </div>
    )
};

export default Navbar;