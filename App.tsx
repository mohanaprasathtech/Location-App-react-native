import React, {createContext, useEffect, useState} from 'react';
import HomeStatic from './Src/static/HomeStatic';
import staticdata from './Src/static/Data';

export const datacontext = createContext<any | null>(null);
function App() {
  const [count, setcount] = useState<number>(0);
  const [data, setdata] = useState<any>([]);

  function handleremove(id: number) {
    let ids = id;
    setdata(data.filter((item: any) => item.id !== ids));
  }

  useEffect(() => {
    let interval: any;
    if (count < 25) {
      interval = setInterval(function () {
        let tempData: any = data.slice(0);
        tempData.push(staticdata[count]);
        setdata(tempData);
        setcount(prev => prev + 1);
      }, 300000);
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <datacontext.Provider value={data}>
      <HomeStatic handleremove={handleremove} />
    </datacontext.Provider>
  );
}

export default App;
