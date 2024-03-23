import React, { useState } from 'react';

// Retrieves users by doing API calls

function RetrievedUsers() {

  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const url = 'https://jsonplaceholder.typicode.com/users'


  // Recursive function to flatten nested objects
  const FlattenJSON = (jsonObj, prefix = '') => {
    return Object.keys(jsonObj).reduce((acc, key) => {
      const propName = prefix ? `${prefix}.${key}` : key

      if (typeof jsonObj[key] === 'object' && jsonObj[key] !== null) {
        const nested = FlattenJSON(jsonObj[key], propName)
        return { ...acc, ...nested }

      } else {
        return { ...acc, [propName]: jsonObj[key] };
      }
    }, {})
  }


  const fetchUsers = async () => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
      throw new Error(`Error Status ${response.status}`)
      }

      var usersData = await response.json()
      var usersObj = usersData.map(user => FlattenJSON(user));

      console.log(usersObj[0]['address.city'])

      setUsers(usersObj)
      setError(null)

    } catch (e) {
      setError(e.message)
      setUsers(null)
    }
  }


  return (
    <>
      <div className='retrievedUsers'>
        <div className='instructions'>
          <h1>
            Retrieve Users
          </h1>
          <button onClick={fetchUsers}>
            Retrieve
          </button>
        </div>
        
        <div className='display'>
          <div className='userContainer'>
            {users ? 
          
              <ol>
                  {users.map((user, index) => (
                  <li key={index}>
                      <strong>Name:</strong> {user.name}<br/>
                      <strong>Username:</strong> {user.username}<br/>
                      <strong>Email:</strong> {user.email}<br/>
                      <strong>Address:</strong> 
                      
                      <ul>
                          <li><strong>City:</strong> {user['address.city']}<br/></li>
                          <li><strong>Street:</strong> {user['address.street']}<br/></li>
                          <li><strong>Suite:</strong> {user['address.suite']}<br/></li>
                          <li><strong>Zipcode:</strong> {user['address.zipcode']}<br/></li>
                          <li><strong>Geo (longitude by latitude):</strong> {user['address.geo.lng']}, {user['address.geo.lat']}<br/></li>
                      </ul>

                      <strong>Phone:</strong> {user.phone}<br/>
                      <strong>Website:</strong> {user.website}<br/>
                      <strong>Company:</strong> 

                      <ul>
                          <li><strong>Name:</strong> {user['company.name']}<br/></li>
                          <li><strong>Catchphrase:</strong> {user['company.catchPhrase']}<br/></li>
                          <li><strong>Business:</strong> {user['company.bs']}<br/></li>
                      </ul>

                  </li>
                  ))}
              </ol>
          
            : <p>{error}</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default RetrievedUsers