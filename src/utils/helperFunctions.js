import axios from 'axios';

export const getTwitterThread = async (conversationId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_TWITTER_THREAD_API}conversation/${conversationId}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getFileName = (text) => {
  return text.split(' ').slice(0, 5).join('_') || 'Thread to Pdf';
};

export const createHash = (input) => {
  var hash = 0,
    len = input.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + input?.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  return hash;
};
