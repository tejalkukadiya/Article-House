import React from 'react';

const UserAvatar = ({profileImage}) => {
  return (
    <img
      src={profileImage}
      height="40px"
      width="40px"
      className="rounded-circle z-depth-1"
      alt="profile-avatar"
    />
  )
}

export default UserAvatar;