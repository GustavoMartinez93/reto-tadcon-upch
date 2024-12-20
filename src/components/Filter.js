import React, { useState } from 'react';

function Filter({ ages, onSearch }) {
  const [age, setAge] = useState('18');
  const [gender, setGender] = useState('female');

  const handleSearchClick = () => {
    if (onSearch) onSearch(age, gender);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="row py-3">
          <div className="form-group col-sm-12 col-lg-4">
            <select 
              className="form-select form-select-sm"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            >
              {
                ages.map((ageUs, index)=>{
                  return <option key={index} value={ageUs}>{ageUs}</option>
                })
              }
            </select>
          </div>
          <div className="form-group col-sm-12 col-lg-4">
            <select 
              className="form-select form-select-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className="col-sm-12 col-lg-4">
            <button 
              className="btn btn-sm btn-primary px-4 btn-search"
              onClick={handleSearchClick}
            >
              <i className="bi bi-search me-2"></i> Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
