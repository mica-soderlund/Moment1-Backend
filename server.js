//Skapa servern med Express 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Anslutning till databasen
const db = new sqlite3.Database(process.env.DATABASE_URL);

// Ställ in EJS som vyhanterare
app.set('view engine', 'ejs');

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Statiska filer
app.use(express.static('public'));

// Starta servern
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});



// STARTSIDA - Visa alla kurser
app.get('/', (req, res) => {
    db.all('SELECT * FROM courses', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internt serverfel");
      } else {
        res.render('index', { courses: rows }); // Skickar "courses" till index.ejs
      }
    });
  });
  
  // Om-sidan routing rutt
app.get('/about', (req, res) => {
  res.render('about');
});

// Uppdatera-sidan rutt
app.get('/update', (req, res) => {
  res.render('update');
});

  // Lägg till ny kurs - Formulärsida
  app.get('/add', (req, res) => {
    res.render('add');
  });
  
  // Post route för att lägga till ny kurs
  app.post('/add', (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;
    db.run('INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)',
      [coursecode, coursename, syllabus, progression],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internt serverfel");
        } else {
          res.redirect('/');
        }
      });
  });
  
  //Skapar en rutt för Radera en kurs
  app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM courses WHERE id = ?', id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internt serverfel");
      } else {
        res.redirect('/');
      }
    });
  });


// Skapa en rutt för att visa Ändra/uppdatera en kurs
app.get('/update/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM courses WHERE id = ?', id, (err, row) => {
      if (err) {
          console.error(err);
          res.status(500).send("Internt serverfel");
      } else {
          res.render('update', { course: row }); // denna skickar "course" till update.ejs
      }
  });
});

// Uppdatera en kurs med POST-rutt
app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const { coursecode, coursename, syllabus, progression } = req.body;
  db.run(
      'UPDATE courses SET coursecode = ?, coursename = ?, syllabus = ?, progression = ? WHERE id = ?',
      [coursecode, coursename, syllabus, progression, id],
      (err) => {
          if (err) {
              console.error(err);
              res.status(500).send("Internt serverfel");
          } else {
              res.redirect('/');
          }
      }
  );
});

