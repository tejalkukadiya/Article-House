import React from 'react';
import ArticleItem from './ArticleItem';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdbreact';

class ArticlesList extends React.Component {
  state = {
    searchInput: '',
  }

  handlesearchInput = event => {
    const value = event.currentTarget.value;
    const { searchInput } = this.state;
    if (event.keyCode === 13) {
      this.handleSearch();
    }
    else {
      if (value && value !== searchInput) {
        this.setState({
          searchInput: value,
        });
      }
    }
  }

  handleSearch = (isClear) => {
    const { searchInput } = this.state;
    const { handleSearchArticle } = this.props;
    if (isClear) {
      this.setState({
        searchInput: '',
      });
    }
    handleSearchArticle(searchInput, isClear);
  }

  render() {
    const { articles, handleLike, profileData, addComment, selectedFilter, filterArticles } = this.props;
    const { searchInput } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col">
            <MDBDropdown>
              <MDBDropdownToggle caret color="white">
                {selectedFilter}
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem onClick={() => { filterArticles('Recents') }}>Recents</MDBDropdownItem>
                <MDBDropdownItem onClick={() => { filterArticles('Most Popular') }}>Most Popular</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div className="col-3 d-flex align-items-center">
            <input
              type="text"
              value={searchInput}
              className={`form-control`}
              name={`search-article`}
              placeholder="Search..."
              required
              aria-describedby="basic-addon1"
              onChange={this.handlesearchInput}
              onKeyDown={this.handlesearchInput}
            />
            <i
              className={
                searchInput.length > 0
                  ? 'fas fa-times search-icon'
                  : 'fas fa-search search-icon'
              }
              aria-hidden="true"
              onClick={() => { this.handleSearch(true) }}
            />

          </div>
        </div>
        {articles.list && articles.list.data.length > 0 ?
          articles.list.data.map((article, i) => (
            <ArticleItem article={article} key={article.id} handleLike={handleLike} profileData={profileData} addComment={addComment} />
          )) :
          (
            <div className="row text-center mt-4">
              <div className="col">
                <h4>No Articles found.</h4>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default ArticlesList;