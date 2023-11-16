import React, { useEffect, useState } from 'react';
import '../css/Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';

const Header = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('');
    const [user, setUser] = useState('');
    useEffect(() => {
        const path = location.pathname;
        if (path === '/blogs') {
        setActiveTab('All Blogs');
        } else if (path === '/myBlogs') {
        setActiveTab('My Blogs');
        } else if (path === '/blogs/add') {
        setActiveTab('Add Blog');
        } else{
          setActiveTab('');
        }
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser){
            setUser(storedUser);
        }
    }, [location]);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
  return (
    <header>
        <nav>
          <Link to="/">
            <div className="logo">
              <h2>BLOGGIFY PRO</h2>
            </div>
          </Link>
            {isLoggedIn && <div className='tabs'>
              <Link to="/blogs"
                className={`tab ${activeTab === 'All Blogs' ? 'active' : ''}`}
                onClick={() => handleTabClick('All Blogs')}
              >
                <h3>ALL BLOGS</h3>
              </Link >
              <Link to="/myBlogs"
                className={`tab ${activeTab === 'My Blogs' ? 'active' : ''}`}
                onClick={() => handleTabClick('My Blogs')}
              >
                <h3>MY BLOGS</h3>
              </Link >
              <Link to="/blogs/add"
                className={`tab ${activeTab === 'Add Blog' ? 'active' : ''}`}
                onClick={() => handleTabClick('Add Blog')}
              ><h3>ADD BLOG</h3></Link>
            </div>}
            <div className="buttons">
                {!isLoggedIn && <><Link to="/login">
                    <button><h3>LOGIN</h3></button>
                </Link>
                <Link to="/signup">
                    <button><h3>SIGNUP</h3></button>
                </Link></>}
                {isLoggedIn && <>
                <div className='profile'>
                <Link to="/profile" className='profile-focus'>
                  <div className="profile-pic">
                    {user && <h2>{user.name.charAt(0)}</h2>}
                  </div>
                </Link>
                <Link to="/login">
                  <button onClick={()=>{dispatch(authActions.logout());alert("Logged Out successfully.")}}><h3>LOGOUT</h3></button>
                </Link></div></>}
            </div>
        </nav>
    </header>
  )
}

export default Header 