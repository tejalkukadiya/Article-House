import React from 'react';
import { MDBBtn } from 'mdbreact';

class ProfileSection extends React.Component {
  render() {
    const { profileData, handleAddArticle, handleEdit } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="profile-data text-center">
              <img
                src={profileData && profileData.profileImage}
                className="rounded-circle hoverable mb-4"
                alt="profile-avatar"
                height="100px"
                width="100px"
              />
              <p>
                <strong>{profileData && profileData.userName}</strong>
              </p>
              <p>
                <strong> Articles Published :
             {profileData && profileData.articlesCount}</strong>
              </p>
              <MDBBtn rounded color="white" className="add-new" onClick={() => { handleAddArticle() }}> Add New Article </MDBBtn>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h4 className="text-center">
              <strong>My Articles</strong>
            </h4>
            <hr />
            <div>
              {profileData && profileData.articleList.length > 0 ?
                profileData.articleList.map(article => (
                  <div className="row p-2 mb-2" key={article.id}>
                    <div className="col">
                      <p> {article.title}</p>
                    </div>
                    <div className="col-2 text-right">
                      <span className="edit-my-article" onClick={() => { handleEdit(article.id) }}><i className="fas fa-pencil-alt"></i></span>
                    </div>
                  </div>
                ))
                :
                <div className="row">
                  <div className="col">
                    <h5 className="text-center">No Article found.</h5>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileSection;