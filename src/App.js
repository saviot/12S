import {useEffect, useState} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Api from './utils/api';
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({
    user_id: '',
    nama: '',
    title: '',
    avatar: '',
  });

  const user = new Api().getUserInfo();

  useEffect(() => {
    user.then((res) => {
      setCurrentUser({
        user_id: res._id,
        nama: res.name,
        title: res.about,
        avatar: res.avatar,
      });
    });
  }, []); // eslint-disable-line

  // CARD
  const [cardData, setCardData] = useState([]);

  const cards = new Api().getAllCards();

  useEffect(() => {
    cards.then((res) => {
      setCardData(res);
    });
  }, []); // eslint-disable-line

  return (
    <CurrentUserContext.Provider
      value={{
        user_id: currentUser.user_id,
        nama: currentUser.nama,
        title: currentUser.title,
        avatar: currentUser.avatar,
        setCurrentUser,
      }}
    >
      <Header />

      <Main cardData={cardData} setCardData={setCardData} />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
