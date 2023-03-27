// Connect to database
const db = openDatabase('counter', '1.0', 'Counter Database', 2 * 1024 * 1024);

// Create table if it doesn't exist
db.transaction(function(tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS counter (value)');
});

// Get counter value from database and display on webpage
db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM counter', [], function(tx, results) {
    var counterValue = results.rows.item(0).value;
    document.getElementById("counter-value").innerHTML = counterValue;
  });
});

// Increment function
function increment() {
  db.transaction(function(tx) {
    tx.executeSql('UPDATE counter SET value = value + 1', [], function() {
      // Get updated value from database and display on webpage
      db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM counter', [], function(tx, results) {
          var counterValue = results.rows.item(0).value;
          document.getElementById("counter-value").innerHTML = counterValue;
        });
      });
    });
  });
}

// Decrement function
function decrement() {
  db.transaction(function(tx) {
    tx.executeSql('UPDATE counter SET value = value - 1', [], function() {
      // Get updated value from database and display on webpage
      db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM counter', [], function(tx, results) {
          var counterValue = results.rows.item(0).value;
          document.getElementById("counter-value").innerHTML = counterValue;
        });
      });
    });
  });
}

// Reset function
function reset() {
  db.transaction(function(tx) {
    tx.executeSql('UPDATE counter SET value = 0', [], function() {
      // Get updated value from database and display on webpage
      db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM counter', [], function(tx, results) {
          var counterValue = results.rows.item(0).value;
          document.getElementById("counter-value").innerHTML = counterValue;
        });
      });
    });
  });
}
