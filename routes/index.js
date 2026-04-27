var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    req.db.query('SELECT * FROM comments;', (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).send('Error fetching comments');
      }

      // Upon loading the app displays the landing page
      res.render('landing_page');
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* CREATE comment */
router.post('/create', function (req, res, next) {
  let { comment } = req.body;

  // Doesn't allow an empty comment to be submitted
  if (!comment.trim()) {
    return res.status(400).json({ error: "Comment cannot be empty" });
  }

  // Doesn't let a comment over 300 be posted
  if (comment.length > 300) {
    return res.status(400).json({ error: "Comment cannot exceed 300 characters."});
  }

  // Basic XSS sanitization 
  /* used assistance from Copilot */
  comment = comment
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  try {
    req.db.query(
      'INSERT INTO comments (comment) VALUES (?);',
      [comment],
      (err, results) => {
        if (err) {
          console.error('Error adding comment:', err);
          return res.status(500).json({ error: "Something went wrong. Please try again." });
        }

        console.log('Comment added successfully:', results);
        res.redirect('/customer_comments');
      }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('Error adding comment');
  }
});

/* PAGE ROUTES */
router.get('/menu', (req, res) => {
  res.render('menu');
});

router.get('/about_us', (req, res) => {
  res.render('about_us');
});

// Creates the text for how long ago the comment was posted 
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} minute(s) ago`;
  if (diffHr  < 24) return `${diffHr} hour(s) ago`;
  if (diffDay < 7)  return `${diffDay} day(s) ago`;

  return date.toLocaleString();
}

/* Assistance from Copilot was used */
router.get('/customer_comments', function (req, res) {
  const limit = parseInt(req.query.limit) || 10;

  // Count total comments
  req.db.query('SELECT COUNT(*) AS count FROM comments;', (err, countResult) => {
    if (err) return res.status(500).send("Error counting comments");

    const totalComments = countResult[0].count;

    // Fetch only the comments up to the limit
    req.db.query(
      'SELECT * FROM comments ORDER BY created_at DESC LIMIT ?;',
      [limit],
      (err, results) => {
        if (err) return res.status(500).send("Error loading comments");

        const comments = results.map(row => ({
          ...row,
          timeAgo: formatTimeAgo(new Date(row.created_at))
        }));

        res.render('customer_comments', {
          title: 'Customer Comments',
          comments,
          limit,
          totalComments
        });
      }
    );
  });
});

router.get('/landing_page', (req, res) => {
  res.render('landing_page', { title: 'Downtown Donuts' });
});

module.exports = router;
