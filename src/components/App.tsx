import * as React from 'react';
import { useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import DataProps from '../interfaces/DataProps';
import Comment from './cards/Comment';

const App:React.FC = () => {
  const [data, setData] = useState<DataProps | null>(null);
  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      {
        data &&
        <UserContext.Provider value={data.currentUser}>
          {data.comments.map(comment => {
            return (
              <Comment {...comment}/>
            )
          })}
        </UserContext.Provider>
      }
    </>
  );
}

export default App;