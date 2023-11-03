import React, { useRef, useState, memo, useMemo } from 'react';
import './index.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect } from 'react';
import Blocky from '../blocky/Blocky';
import Spinner from '../Spinner';
import Swal from 'sweetalert2';

const firebaseConfig = {
  apiKey: 'AIzaSyB2hTK15-igUTK7c0SNHUDDu9EDP5y13x8',
  authDomain: 'zeta-chat.firebaseapp.com',
  projectId: 'zeta-chat',
  storageBucket: 'zeta-chat.appspot.com',
  messagingSenderId: '391903387024',
  appId: '1:391903387024:web:744b1c0346693445c06715',
  measurementId: 'G-SKG4LB0J9M',
};
firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();
const reduceAddress = (value) => {
  return value.substr(0, 3) + '...' + value.substr(value.length - 3, 3);
};

function ChatBox(props) {
  const { PULSEPOT } = props;
  // const [user] = useAuthState(auth);
  return (
    <div className='chatbox-container'>
      <ChatRoom userInfo={PULSEPOT.userInfo} />
    </div>
  );
}

const getSeconds = (a) => {
  return a.createdAt ? a.createdAt.seconds : new Date().getTime() / 1000;
};

function ChatRoom(props) {
  const { account } = props.userInfo;
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'desc');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState();
  const [empty, setEmpty] = useState(false);
  const [realTimeMessages] = useCollectionData(messagesRef.orderBy('createdAt', 'desc').limit(25), { idField: 'id' });
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  // const [isAtTop, setIsAtTop] = useState(false);
  const [formValue, setFormValue] = useState('');
  const swalBackground = '#343544';
  const swalColor = 'white';
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: swalBackground,
    color: swalColor,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  useEffect(() => {
    setLoading(true);
    query
      .limit(25)
      .get()
      .then((collections) => {
        updateState(collections.docs.map((color) => color.data()));
        setLastKey(collections.docs[collections.docs.length - 1]);
      });
  }, []);

  const updateState = (data) => {
    const isCollectionEmpty = !data || data.length == 0;
    if (!isCollectionEmpty) {
      const newMessages = data.filter((item) => {
        return (
          messages.findIndex(
            (msg) => msg.uid == item.uid && getSeconds(msg) == getSeconds(item) && msg.text == item.text
          ) == -1
        );
      });
      setMessages((messages) =>
        [...messages.filter((msg) => msg.createdAt), ...newMessages].sort((a, b) => getSeconds(a) - getSeconds(b))
      );
    } else {
      setEmpty(true);
    }
    setLoading(false);
  };

  const fetchMorePosts = () => {
    if (loading || empty) return;
    setLoading(true);
    query
      .startAfter(lastKey)
      .limit(25)
      .get()
      .then((collections) => {
        updateState(collections.docs.map((color) => color.data()));
        setLastKey(collections.docs[collections.docs.length - 1]);
      });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue.length > 150) {
      Toast.fire({
        icon: 'warning',
        title: "You can't type anymore than 150.",
      });
      return;
    }
    setFormValue('');

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: account,
    });
  };

  useEffect(() => {
    if (realTimeMessages) {
      updateState(realTimeMessages);
    }
  }, [realTimeMessages]);

  const onScroll = (e) => {
    const element = e.target;
    if (element.scrollTop <= lastScrollTop) {
      setIsAtBottom(false);
      if (element.scrollTop <= 0) {
        fetchMorePosts();
      }
    } else {
      if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    }
    setLastScrollTop(element.scrollTop <= 0 ? 0 : element.scrollTop);
  };

  useEffect(() => {
    if (isAtBottom) {
      setTimeout(() => dummy.current && dummy.current.scrollIntoView({ behavior: 'instant' }), 300);
    }
  }, [messages]);

  return (
    <>
      <main id='msg-list-container' onScroll={onScroll}>
        {loading && (
          <div style={{ marginTop: '5px' }} className='waitingFP'>
            <div className='loading-spinner'>
              Loading
              <Spinner />
            </div>
          </div>
        )}
        {messages &&
          messages.map((msg) => <MemoChatMessage account={account} key={JSON.stringify(msg)} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onFocus={(e) => e.preventDefault()}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder={account ? 'Type your message here...' : 'Connect Wallet to chat'}
          disabled={!account}
          style={{ width: '65%' }}
        />
        <button type='submit' disabled={!formValue || !account}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { account } = props;
  const { text, uid } = props.message;
  const messageClass = uid == account ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <div className='user-id'>
        <Blocky address={uid} scale_={16} size_={1} bgColor_={uid} spotColor_={uid} className_={'round-identicon'} />
        {reduceAddress(uid)}:
      </div>
      {text}
    </div>
  );
}
const MemoChatMessage = memo(ChatMessage);
export default memo(ChatBox);
