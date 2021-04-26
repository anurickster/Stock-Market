import './App.css';
import Nav from './Component/Nav/Nav.jsx';
import Card from './Component/Card/Card.jsx';
import Home from './Component/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import View from './Component/View/View';
import axios from 'axios';
import { useEffect, useState } from 'react';

const apiurl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=150&page=16parkline=false'

function App() {
  const [apistoredata, setapistoredata] = useState([]);
  const [localtemp, setlocaltemp] = useState([]);
  const [localstoredata, setlocalstoredata] = useState([]);

  useEffect(() => {
    async function fetchapidata() {
      const apiresponse = await
        axios.get(apiurl)
      setapistoredata(apiresponse.data);
    }
    fetchapidata();
    fetchlocaldata();

    var temp = []
    localstoredata.map((localelements, index) => temp.push(localelements.symbol))
    setlocaltemp(temp);
  }, [localstoredata]);

  async function fetchlocaldata() {
    const localresponse = await
      axios.get('/getstockdata')
    setlocalstoredata(localresponse.data);
  }

  function savestock(apielements) {
    const stockpass = {
      name: apielements.name,
      symbol: apielements.symbol,
      market_cap: apielements.market_cap,
      current_price: apielements.current_price
    }
    axios.post('/savedElements', stockpass)
    setlocalstoredata((oldvalue) => {
      return [...oldvalue, apielements]
    });
    fetchlocaldata();
  }

  function deletelocalstock(apielements, index) {
    const data = { _id: apielements._id }
    axios.delete('/deletestock', { data });
    fetchlocaldata();
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="container">
          <Card />
          <Switch>
            <Route exact path="/">
              <Home apistoredata={apistoredata} savestock={savestock} localtemp={localtemp} localstoredata={localstoredata} />
            </Route>
            <Route exact path="/view">
              <View deletelocalstock={deletelocalstock} localstoredata={localstoredata} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
