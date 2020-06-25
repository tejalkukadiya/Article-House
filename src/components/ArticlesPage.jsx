import React from 'react';
import sort from 'fast-sort';
import moment from 'moment';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBRow, MDBCol,
  MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn
} from "mdbreact";
import { connect } from "react-redux";
import history from '../history';
import ProfileSection from './ProfileSection';
import ArticlesListPage from './ArticlesListPage';
import AddArticleForm from './AddArticleForm';
import TrendingSection from './TrendingSection';
import {
  setProfile,
  fetchArticles,
  handleLikes,
  addCommentAction,
  addArticleAction,
  addtoMyArticles,
  updateArticleAction,
  updatetoMyArticles,
  fetchTrending,
} from '../actions/profileActions';

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedFilter: 'recents',
      filteredArticles: {},
      showAddModal: false,
      currArticle: {},
      editId:'',
    };
    this.addArticleRef = React.createRef();
  }



  componentDidMount() {
    const { fetchProfileData, fetchArticles, trendingArticles } = this.props;
    fetchProfileData();
    fetchArticles();
    trendingArticles();
  }

  componentDidUpdate(prevProps) {
    const { articlesList } = this.props;
    if (articlesList !== prevProps.articlesList) {
      this.setState({
        filteredArticles: { ...articlesList },
      })
    }
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleLike = (id) => {
    const { likeAction } = this.props;
    likeAction(id);
  }

  addComment = (id, commentValue) => {
    const { addComment, profileData } = this.props;
    addComment(id, commentValue, profileData.profile);
  }

  filterArticles = value => {
    const { filteredArticles } = this.state;
    if (value === 'Recents') {
      filteredArticles.list = {
        data: sort([...filteredArticles.list.data]).desc(u => moment(u.publishedDate))
      }
    } else if (value === 'Most Popular') {
      filteredArticles.list = {
        data: sort([...filteredArticles.list.data]).desc(u => u.likes + u.CommentCount)
      }
    }
    this.setState({
      selectedFilter: value,
      filteredArticles,
    });
  }

  handleSearchArticle = (text, isClear) => {
    const { articlesList } = this.props;
    let { filteredArticles } = this.state;
    if (isClear) {
      filteredArticles = { ...articlesList };
    } else {
      const regexp = new RegExp(
        `${text.replace(/([.*+?^${}()|[\]/\\])/g, '\\$1')}`,
        'gi',
      );
      filteredArticles.list = {
        data: [...filteredArticles.list.data].filter(listItem =>
          listItem.title.match(regexp),
        )
      };
    }

    this.setState({
      filteredArticles,
    });
  }

  handleAddArticle = () => {
    const { showAddModal } = this.state;
    this.setState({
      showAddModal: !this.state.showAddModal,
      editId: !showAddModal ? this.state.editId : '',
      currArticle: !showAddModal ? this.state.currArticle : '',
    });
  }

  addArticle = (title, desc, image) => {
    const { profileData, addArticle, articlesList, addtoMyProfile, updateArticle, UpdatetoMyProfile } = this.props;
    const { editId, currArticle } = this.state;
    if (editId) {
      const objToAdd = {
        id: currArticle.id,
        title,
        description: desc,
        author: {
          userName: profileData.profile.userName,
          profileImage: profileData.profile.profileImage,
        },
        category: '',
        publishedDate: currArticle.publishedDate,
        likes: currArticle.likes,
        isLiked: currArticle.isLiked,
        CommentCount: currArticle.CommentCount,
        CommentsData: currArticle.CommentsData,
        articleImage: image || '',
      }
      updateArticle(objToAdd);
      UpdatetoMyProfile(objToAdd);
    } else {
      const id = 100 + parseInt(articlesList.list.data.length, 10) + 1;
      const objToAdd = {
        id,
        title,
        description: desc,
        author: {
          userName: profileData.profile.userName,
          profileImage: profileData.profile.profileImage,
        },
        category: '',
        publishedDate: moment().format('LLL'),
        likes: 0,
        isLiked: false,
        CommentCount: 0,
        CommentsData: [],
        articleImage: image || '',
      }
      addArticle(objToAdd);
      addtoMyProfile(objToAdd);
    }

    this.handleAddArticle();
  }

  handleEdit = id => {
    const { articlesList } = this.props;
    const currArticle = articlesList.list.data.find(article => article.id === id);
    this.setState({
      showAddModal: true,
      editId: id,
      currArticle,
    });
  }

  render() {
    const { profileData } = this.props;
    const { selectedFilter, filteredArticles, showAddModal, currArticle, editId } = this.state;
    return (
      <div>
        {/* navbar starts */}
        <MDBNavbar color="white" dark expand="md" className="fixed-top">
          <MDBNavbarBrand>
            <strong className="black-text">Article House</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBNavbarNav right>
            <MDBNavItem >
              <MDBDropdown>
                <MDBDropdownToggle nav caret className="black-text">
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu basic right>
                  <MDBDropdownItem href="#!" onClick={(e) => {
                    e.preventDefault();
                    window.localStorage.removeItem('isAuthenticated');
                    history.push('/');
                  }}
                    className="black-text">Log Out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
        {/* navbar ends */}
        {/* main container */}
        <MDBContainer fluid className="pl-0 pr-0 main-content-wrapper">
          <MDBModal isOpen={showAddModal} toggle={this.handleAddArticle} size="lg">
            <MDBModalHeader toggle={this.handleAddArticle}>{editId ? 'Update Article' : 'Add New Article'}</MDBModalHeader>
            <MDBModalBody>
              <AddArticleForm ref={this.addArticleRef} addArticleHandle={this.addArticle} currArticle={currArticle} editId={editId} />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="white" onClick={this.handleAddArticle}>Cancel</MDBBtn>
              <MDBBtn color="primary" onClick={() => {
                if (this.addArticleRef && this.addArticleRef.current) {
                  this.addArticleRef.current.submitHandler();
                }
              }}>{editId ? 'Update' : 'Create'}</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          <MDBRow className="no-gutters">

            {/* left profile section starts */}
            <MDBCol md="3" className="profile-section-wrapper">
              <ProfileSection profileData={profileData.profile} handleAddArticle={this.handleAddArticle} handleEdit={this.handleEdit} />
            </MDBCol>
            {/* left profile section ends */}

            {/* center articles list starts */}
            <MDBCol md="6" className="grey lighten-5 mt-2 p-4 article-list-wrapper ">
              <ArticlesListPage
                articles={filteredArticles}
                handleLike={this.handleLike}
                profileData={profileData.profile}
                addComment={this.addComment}
                selectedFilter={selectedFilter}
                filterArticles={this.filterArticles}
                handleSearchArticle={this.handleSearchArticle}
              />
            </MDBCol>
            {/* center articles center ends */}

            {/* right trending section starts */}
            <MDBCol md="3" className="grey lighten-5 mt-2">
              <TrendingSection trendingList={profileData.trendingList}/>
            </MDBCol>
            {/* right trending section starts */}

          </MDBRow>
        </MDBContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profileData: state.profileData,
    articlesList: state.articlesList,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfileData: () => dispatch(setProfile()),
  fetchArticles: () => dispatch(fetchArticles()),
  likeAction: (id) => dispatch(handleLikes(id)),
  addComment: (id, value, user) => dispatch(addCommentAction(id, value, user)),
  addtoMyProfile: (article) => dispatch(addtoMyArticles(article)),
  addArticle: (data) => dispatch(addArticleAction(data)),
  updateArticle: (data) => dispatch(updateArticleAction(data)),
  UpdatetoMyProfile: (data) => dispatch(updatetoMyArticles(data)),
  trendingArticles: () => dispatch(fetchTrending()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesPage);