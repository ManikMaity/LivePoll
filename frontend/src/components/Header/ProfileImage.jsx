import React from 'react'
import { Link } from 'react-router-dom'
import useUserStore from '../../store/useStore';

function ProfileImage({userData}) {

    const {setUser} = useUserStore();

    const handleLogout = () => {
        setUser({});
    }


  return (
    <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li className='font-bold'><a >{userData?.username || "User"}</a></li>
        <li>
          <Link to={'/dashboard'} className="justify-between" >
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )
}

export default ProfileImage
