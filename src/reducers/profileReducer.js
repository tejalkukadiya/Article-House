export default function profileReducer(store = {}, action) {
  let newStore = {};
  switch (action.type) {
    case 'SET_PROFILE':
      newStore = {
        ...store,
        profile: action.payload,
      }
      break;

    case 'ADD_ARTICLE_PROFILE':
      const newArticle = action.payload.article;
      const profiledata = { ...store.profile };
      profiledata.articleList.unshift({ ...newArticle })
      newStore = {
        ...store,
        profile: { ...profiledata, articlesCount: profiledata.articleList.length },
      }
      break;
    case 'UPDATE_ARTICLE_PROFILE':
      const tempArticle = action.payload.article;
      const tempProfile = { ...store.profile };
      const listData = tempProfile.articleList.map(article => {
        if (article.id === tempArticle.id) {
          return tempArticle;
        }
        return article;
      }); newStore = {
        ...store,
        profile: { ...tempProfile, articleList: listData },
      }
      break;

    case 'SET_TRENDING':
      newStore = {
        ...store,
        trendingList: action.payload,
      }
      break;

    default:
      newStore = {
        ...store,
      }
  }
  return newStore;
}