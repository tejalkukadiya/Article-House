import React from 'react';
import moment from 'moment';
import UserAvtar from '../Utils/UserAvatar';
import CommentBox from './CommentBox';

class ArticleItem extends React.Component {
  state = {
    commentShow: false,
  }

  handleCommentToggle = () => {
    this.setState({
      commentShow: !this.state.commentShow,
    })
  }
  render() {
    const { article, handleLike, profileData, addComment } = this.props;
    const { commentShow } = this.state;
    const daysDiff = moment(new Date()).diff(new Date(article.publishedDate), 'days', true);
    const publishedDate = daysDiff > 8 ? article.publishedDate : moment(article.publishedDate).fromNow() ;
    return (
      <div className="row p-4 mb-2 article-card white">
        <div className="col">
          <div className="row mb-4">
            <div className="col-1">
              <UserAvtar profileImage={article.author.profileImage} />
            </div>
            <div className="col author-info">
              <p><strong>{article.author.userName}</strong></p>
              <p>{publishedDate}</p>
            </div>
          </div>
          <div className="row">
            <div className="col title-text">
              <h4><strong>{article.title}</strong></h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                {article.description}
              </p>
            </div>
          </div>
          <hr />
          <div className="row like-comment-wrapper mb-2">
            <div className="col">
              <span>
                <span onClick={() => {
                  handleLike(article.id);
                }}>
                  {article.isLiked ?
                    <i className="fas fa-heart red-text"></i>
                    : <i className="far fa-heart"></i>}
                </span>
                {' '}
                {article.likes} {' '}
                Likes</span>
            </div>
            <div className="col text-right">
              <span onClick={() => {
                this.handleCommentToggle();
              }}
              >
                <i className="far fa-comment-alt"></i>
                {' '}
                {article.CommentCount} {' '}
                Comments</span>
            </div>
          </div>

          {commentShow &&
            <>
              <hr />
              <div className="row ">
                <div className="col mt-2">
                  <CommentBox article={article} profileData={profileData} addComment={addComment}/>
                </div>
              </div></>}

        </div>
      </div>
    )
  }
}

export default ArticleItem;