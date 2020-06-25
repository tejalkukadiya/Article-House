import moment from 'moment';

export default function articleReducer(store = {}, action) {
  let newStore = {};
  switch (action.type) {
    case 'FETCH_ARTICLES':
      newStore = {
        ...store,
        list: action.payload,
      }
      break;

    case 'SET_LIKES':
      const { articleId } = action.payload;
      const articleList = { ...store.list };
      const filteredList = articleList.data.map(item => {
        const article = { ...item };
        if (item.id === articleId) {
          if (item.isLiked) {
            article.isLiked = false;
            article.likes -= 1;
          } else {
            article.isLiked = true;
            article.likes += 1;
          }
        }
        return article;
      })
      newStore = {
        ...store,
        list: { data: filteredList },
      }
      break;

    case 'ADD_COMMENT':
      const { articleId: id, commentValue, userData } = action.payload;
      const tempList = { ...store.list };
      const newList = tempList.data.map(item => {
        const article = { ...item };
        if (article.id === id) {
          article.CommentCount += 1;
          article.CommentsData.unshift({
            comment: commentValue,
            userData: {
              userName: userData.userName,
              profileImage: userData.profileImage,
            },
            publishedDate: moment().format('LLL'),
          });
        }
        return article;
      })
      newStore = {
        ...store,
        list: { data: newList },
      }
      break;

    case 'ADD_ARTICLE':
      const list = { ...store.list };
      const newArticle = action.payload.article;
      list.data.unshift({ ...newArticle })
      newStore = {
        ...store,
        list,
      }
      break;

    case 'UPDATE _ARTICLE':
      const tempArticle = action.payload.article;
      const listData = store.list.data.map(article => {
        if(article.id === tempArticle.id){
          return tempArticle;
        }
        return article;
      });
      newStore = {
        ...store,
        list:{data: listData},
      }
      break;

    default:
      newStore = {
        ...store,

      }
  }
  return newStore;
}