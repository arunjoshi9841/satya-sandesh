import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./components/login/loginSlice";
import authReducer from "./components/auth/authSlice";
import postReducer from "./components/post/postSlice";
import homeReducer from "./components/home/homeSlice";
import signupReducer from "./components/signup/signupSlice";
import navigationReducer from "./components/navigation/navigationSlice";
import articleReducer from "./components/article/articleSlice";
import labelReducer from "./components/labels/labelSlice";
import quoteReducer from "./components/quotes/quoteSlice";
import reviewReducer from './components/review/reviewSlice';
import featureReducer from './components/feature/featureSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
    post: postReducer,
    home: homeReducer,
    signup: signupReducer,
    navigation: navigationReducer,
    article: articleReducer,
    label: labelReducer,
    quote: quoteReducer,
    review: reviewReducer,
    feature: featureReducer,
  },
});
