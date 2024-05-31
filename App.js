import React, { useState, useEffect } from 'react';
import './App.css';
import QRCode from 'qrcode.react';

function App() {
    const [section, setSection] = useState('membership');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || 'user123');
    const [membershipDetails] = useState('1 Month Membership');
    const [customerName, setCustomerName] = useState('John Doe');
    const [mobileNo, setMobileNo] = useState('1234567890');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedCustomerName = localStorage.getItem('customerName');
        const storedMobileNo = localStorage.getItem('mobileNo');

        if (storedCustomerName) setCustomerName(storedCustomerName);
        if (storedMobileNo) setMobileNo(storedMobileNo);
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        localStorage.setItem('customerName', customerName);
        localStorage.setItem('mobileNo', mobileNo);
    };

    return (
        <div className="App">
            <div className="navbar">
                <a href="#" onClick={() => setSection('orderHistory')}>Order History</a>
                <a href="#" onClick={() => setSection('profile')}>Account Profile</a>
                <a href="#" onClick={() => setSection('qrPayment')}>QR Payment</a>
            </div>

            <div className="container">
                {section === 'membership' && (
                    <div className="membership-container">
                        <h1>Welcome to Sudarshan's Fitness</h1>
                        <div className="membership-option">
                            <h3>1 Month Membership</h3>
                            <p>Price: ₹900</p>
                            <button>Buy Now</button>
                            <button className="renew-button">Renew Membership</button>
                        </div>
                        <div className="membership-option">
                            <h3>3 Months Membership</h3>
                            <p>Price: ₹2550</p>
                            <button>Buy Now</button>
                            <button className="renew-button">Renew Membership</button>
                        </div>
                        <div className="membership-option">
                            <h3>6 Months Membership</h3>
                            <p>Price: ₹4800</p>
                            <button>Buy Now</button>
                            <button className="renew-button">Renew Membership</button>
                        </div>
                    </div>
                )}

                {section === 'orderHistory' && (
                    <div className="order-history-container">
                        <h1>Order History</h1>
                        <p>No orders yet.</p>
                    </div>
                )}

                {section === 'profile' && (
                    <div className="profile-container">
                        <h1>Account Profile</h1>
                        <p>User ID: {userId}</p>
                        <p>Membership Details: {membershipDetails}</p>
                        <p>
                            <label htmlFor="customer-name">Customer Name:</label><br />
                            <input
                                type="text"
                                id="customer-name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                disabled={!isEditing}
                            />
                        </p>
                        <p>
                            <label htmlFor="mobile-no">Mobile No.:</label><br />
                            <input
                                type="text"
                                id="mobile-no"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                disabled={!isEditing}
                            />
                        </p>
                        {!isEditing ? (
                            <button onClick={handleEdit}>Edit</button>
                        ) : (
                            <button onClick={handleSave}>Save</button>
                        )}
                    </div>
                )}

                {section === 'qrPayment' && (
                    <div className="qr-payment-container">
                        <h1>QR Code Payment</h1>
                        <div className="membership-option">
                            <h3>1 Month Membership</h3>
                            <p>Price: ₹2000</p>
                            <QRCode value="upi://pay?pa=yourupiid@bank&pn=YourName&am=900&cu=INR" />
                        </div>
                        <div className="membership-option">
                            <h3>3 Months Membership</h3>
                            <p>Price: ₹3500</p>
                            <QRCode value="upi://pay?pa=yourupiid@bank&pn=YourName&am=2550&cu=INR" />
                        </div>
                        <div className="membership-option">
                            <h3>6 Months Membership</h3>
                            <p>Price: ₹5500</p>
                            <QRCode value="upi://pay?pa=yourupiid@bank&pn=YourName&am=4800&cu=INR" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
