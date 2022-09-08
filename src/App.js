import './App.css';
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import { storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getFileName, getTwitterThread } from './utils/helperFunctions';
import { PdfFile } from './Components/PdfFile';

function App() {
  const [conversationId, setConversationId] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [pdfUrl, setPdfUrl] = useState();

  return (
    <div className="App App-header">
      <input
        value={conversationId}
        onChange={(e) => setConversationId(e.target.value)}
        id="input-conversation"
      />
      <button
        id="btn-getPdf"
        onClick={async () => {
          try {
            const res = await getTwitterThread(conversationId);
            const blob = await pdf(
              <PdfFile
                allTweets={res}
                threadId={conversationId}
                username={res[0].username}
              />
            ).toBlob();
            const storageRef = ref(storage, getFileName(res[0]?.text));
            uploadBytes(storageRef, blob).then((snapshot) => {
              console.log('Uploaded a blob or file!', snapshot);
            });
            const url = await getDownloadURL(storageRef);
            setStatus('Success');
            setPdfUrl(url);
          } catch (e) {
            setStatus('Failure');
            console.log(e);
          }
        }}
      >
        Get PDF
      </button>
      <p id="status">{status}</p>
      {pdfUrl && <p id="url">{pdfUrl}</p>}
    </div>
  );
}

export default App;
