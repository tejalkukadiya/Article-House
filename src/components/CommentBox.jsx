import React from 'react';
import moment from 'moment';
import UserAvtar from '../Utils/UserAvatar';

class CommenBox extends React.Component {
  state = {
    commentInput: ''
  }

  handleCommentInput = event => {
    const value = event.currentTarget.value;
    const { commentInput } = this.state;
    if (event.keyCode === 13) {
      const { article } = this.props;
      this.addComment(article.id);
    }
    else {
      if (value && value !== commentInput) {
        this.setState({
          commentInput: value,
        });
      }
    }
  }

  addComment = id => {
    const { addComment } = this.props;
    const { commentInput } = this.state;
    addComment(id, commentInput);
    this.setState({
      commentInput: '',
    })
  }

  render() {
    const { article, profileData } = this.props;
    const { commentInput } = this.state;
    const { CommentsData } = article;
    return (
      <>
        {CommentsData.length > 0 &&
          <div className="row comment-list">
            <div className="col">
              {CommentsData.map((comment) => (
                <div key={comment.comment} className="row p-2">
                  <div className="col">
                    <div className="row">
                      <div className="col-1">
                        <UserAvtar profileImage={comment.userData.profileImage} />
                      </div>
                      <div className="col author-info d-flex align-items-center">
                        <p><strong>{comment.userData.userName} {' '}</strong> <span className="ml-2">{moment(comment.publishedDate).fromNow()}</span></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <p>
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}

        <div className="row p-2">
          <div className="col-1">
            <UserAvtar profileImage={profileData.profileImage} />
          </div>
          <div className="col">
            <input
              type="text"
              value={commentInput}
              className={`form-control`}
              name={`${article.id}-comment`}
              placeholder="Add a comment... "
              required
              aria-describedby="basic-addon1"
              onChange={this.handleCommentInput}
              onKeyDown={this.handleCommentInput}
            />
            <i
              className=
              'fas fa-plus add-comment-icon'
              aria-hidden="true"
              onClick={() => { this.addComment(article.id) }}
            />
          </div>
        </div>

      </>
    )
  }
}

export default CommenBox;