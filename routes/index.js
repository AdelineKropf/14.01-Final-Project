var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  try {
      req.db.query('SELECT * FROM comments;', (err, results) => {
            if (err) {
                    console.error('Error fetching comments:', err);
                            return res.status(500).send('Error fetching comments');
                                  }
                                        /* Upon loading the app displays the landing page */
                                              res.render('landing_page', { title: 'Downtown Donuts', comments: results });
                                                  });
                                                    } catch (error) {
                                                        console.error('Error fetching items:', error);
                                                            res.status(500).send('Error fetching items');
                                                              }
                                                              });

                                                              router.post('/create', function (req, res, next) {
                                                                  const { comment } = req.body;
                                                                      /* Doesn't allow an empty comment to be submitted */ 
                                                                          if (!comment.trim()) {
                                                                                return res.status(400).json({ error: "Comment cannot be empty" });
                                                                                    }
                                                                                        try {
                                                                                              req.db.query('INSERT INTO comments (comment) VALUES (?);', [comment], (err, results) => {
                                                                                                      if (err) {
                                                                                                                console.error('Error adding comment:', err);
                                                                                                                          return res.status(500).send('Error adding comment');
                                                                                                                                  }
                                                                                                                                          console.log('Comment added successfully:', results);
                                                                                                                                                  // Redirect to the home page after adding
                                                                                                                                                          res.redirect('/');
                                                                                                                                                                });
                                                                                                                                                                    } catch (error) {
                                                                                                                                                                          console.error('Error adding comment:', error);
                                                                                                                                                                                res.status(500).send('Error adding comment');
                                                                                                                                                                                    }
                                                                                                                                                                                    });

                                                                                                                                                                                    router.post('/delete', function (req, res, next) {
                                                                                                                                                                                        const { id } = req.body;
                                                                                                                                                                                            try {
                                                                                                                                                                                                  req.db.query('DELETE FROM comments WHERE id = ?;', [id], (err, results) => {
                                                                                                                                                                                                          if (err) {
                                                                                                                                                                                                                    console.error('Error deleting comment:', err);
                                                                                                                                                                                                                              return res.status(500).send('Error deleting comment');
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                              console.log('Comment deleted successfully:', results);
                                                                                                                                                                                                                                                      // Redirect to the home page after deletion
                                                                                                                                                                                                                                                              res.redirect('/');
                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                      }catch (error) {
                                                                                                                                                                                                                                                                              console.error('Error deleting comment:', error);
                                                                                                                                                                                                                                                                                      res.status(500).send('Error deleting comment:');
                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                          router.get('/menu', (req, res) => {
                                                                                                                                                                                                                                                                                            res.render('menu');
                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                            router.get('/about_us', (req, res) => {
                                                                                                                                                                                                                                                                                              res.render('about_us');
                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                              router.get('/customer_comments', (req, res) => {
                                                                                                                                                                                                                                                                                                res.render('customer_comments');
                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                router.get('/landing_page', (req, res) => {
                                                                                                                                                                                                                                                                                                  res.render('landing_page');
                                                                                                                                                                                                                                                                                                  });


                                                                                                                                                                                                                                                                                                  module.exports = router;