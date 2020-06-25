import profileData from '../dummyData/Profile.json';
import articlesList from '../dummyData/articles.json';
import trendingList from '../dummyData/trending.json';

export const setProfile = () => ({
  type: 'SET_PROFILE',
  payload: profileData,
});

export const fetchArticles = () => ({
  type: 'FETCH_ARTICLES',
  payload: articlesList,
})

export const handleLikes = id => ({
  type: 'SET_LIKES',
  payload: { articleId: id },
})

export const addCommentAction = (id, value, user) => ({
  type: 'ADD_COMMENT',
  payload: { articleId: id, commentValue: value, userData: user },
})

export const addtoMyArticles = (article) => ({
  type: 'ADD_ARTICLE_PROFILE',
  payload: { article },
})

export const addArticleAction = (article) => ({
  type: 'ADD_ARTICLE',
  payload: { article },
})

export const updateArticleAction = (article) => ({
  type: 'UPDATE _ARTICLE',
  payload: { article },
})

export const updatetoMyArticles = (article) => ({
  type: 'UPDATE_ARTICLE_PROFILE',
  payload: { article },
})

export const fetchTrending = () => ({
  type: 'SET_TRENDING',
  payload: trendingList ,
})