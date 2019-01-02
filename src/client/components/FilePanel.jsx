import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const fs =require('fs');
const path =require('path');

var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
    
    filelist = filelist || [];
    files.forEach(function(file, id) {
        
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = walkSync(path.join(dir, file), filelist);
      }
      
      filelist.push({"dir" :  dir , "filename" : file , "isdirectory" : fs.statSync(path.join(dir, file)).isDirectory()  , "path" : path.join(dir, file), "id": id });

    });
    return filelist;
  };

  var arr = []                                                        
  walkSync("./tests", arr); 
  console.log(arr);                                                     
  
const PEEPS = [
  { id: 0, name: "Michelle", friends: [1, 2, 3] },
  { id: 1, name: "Sean", friends: [0, 3] },
  { id: 2, name: "Kim", friends: [0, 1, 3] },
  { id: 3, name: "David", friends: [1, 2] }
];

function find(id) {
  return PEEPS.find(p => p.id == id);
}

function RecursiveExample() {
  return (
    <Router>
      <Person match={{ params: { id: 0 }, url: "" }} />
    </Router>
  );
}

function Person({ match }) {
  let person = find(match.params.id);

  return (
    <div>
      <h3>
        {person.name}
        ’s Friends
      </h3>
      <ul>
        {person.friends.map(id => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{find(id).name}</Link>
          </li>
        ))}
      </ul>
      <Route path={`${match.url}/:id`} component={Person} />
    </div>
  );
}

export default RecursiveExample;