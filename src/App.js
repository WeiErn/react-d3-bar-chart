import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import confidentialityData from './data/confidentiality_data.json';
import docTypeData from './data/doctype_data.json';
import languageData from './data/language_data.json';

class App extends Component {
    state = {
        chosen: {
            type: 'Documents',
            data: docTypeData
        },
        data: [
            {
                type: 'Confidentiality',
                data: confidentialityData
            },
            {
                type: 'Documents',
                data: docTypeData
            },
            {
                type: 'Languages',
                data: languageData
            }
        ]
    };

    chooseType = type => {
        const dataArr = this.state.data;
        const chosenData = dataArr.filter(data => data.type === type);
        this.setState({
            chosen: chosenData[0],
        });
    };

    render() {
        return (
          <div className="App">
            <Navbar chooseType={this.chooseType}/>
            <Dashboard chosenData={this.state.chosen}/>
          </div>
        );
    }
}

export default App;
