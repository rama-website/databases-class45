getPopulation('Country', "' OR '1'='1' --", "' OR '1'='1' --", callback);

function getPopulation(Country, name, code, cb) {
    const query = 'SELECT Population FROM ?? WHERE Name = ? and code = ?';
    const values = [Country, name, code];
  
    conn.query(query, values, function (err, result) {
      if (err) {
        cb(err);
      } else {
        if (result.length === 0) {
          cb(new Error('Not found'));
        } else {
          cb(null, result[0].Population);
        }
      }
    });
  }
  