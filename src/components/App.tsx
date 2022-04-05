import * as React from 'react';
import { useState, useEffect } from 'react';
import DataProps from '../interfaces/DataProps';
import Section from './Section';
import UserContext from '../contexts/UserContext';

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
              <Section key={comment.id} {...comment}/>
            )
          })}
        </UserContext.Provider>
      }
    </>
  );
}

export default App;