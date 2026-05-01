// Express router for Downtown Donuts application
// Handles page routing, comment creation, validation, and database queries

var express = require('express');
var router = express.Router();

/* Used help from ChatGPT */
// Helper Function: used to load comments & render page with optical error
function loadCommentsAndRender(req, res, errorMessage) {
  const limit = 10; // Default number of comments to show

  // Count total comments in the database
  req.db.query('SELECT COUNT(*) AS count FROM comments;', (err, countResult) => {
    if (err) return res.status(500).send("Error counting comments");

    const totalComments = countResult[0].count;

    // Fetch the most recent comments up to the limit
    req.db.query(
      'SELECT * FROM comments ORDER BY created_at DESC LIMIT ?;',
      [limit],
      (err, results) => {
        if (err) return res.status(500).send("Error loading comments");

        // Add formatted "time ago" text to each comment
        const comments = results.map(row => ({
          ...row,
          timeAgo: formatTimeAgo(new Date(row.created_at))
        }));

        // Render the comments page with data + optional error message
        res.render('customer_comments', {
          title: 'Downtown Donuts',
          error: errorMessage,
          comments,
          limit,
          totalComments
        });
      }
    );
  });
}

/* GET home/landing page. */
router.get('/', function (req, res) {
  res.render('landing_page');
});

/* CREATE comment */
router.post('/create', function (req, res, next) {
  let { comment } = req.body;

  // Trim whitespace to prevent and empty comment from being submitted 
  comment = comment.trim();
  if (!comment) {
    return loadCommentsAndRender(req, res, "Comment cannot be empty");
  }

  // Enforce 255‑character limit (matches database schema)
  if (comment.length > 255) {
    return loadCommentsAndRender(req, res, "Comment cannot exceed 255 characters.");
  }

  /* used assistance from Copilot */
  // Basic XSS sanitization 
  comment = comment
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Insert the sanitized comment into the database
  try {
    req.db.query(
      'INSERT INTO comments (comment) VALUES (?);',
      [comment],
      (err, results) => {
        if (err) {
          console.error('Error adding comment:', err);
          return loadCommentsAndRender(req, res, "Failed to save comment. Please try again.");
        }

        console.log('Comment added successfully:', results);
        res.redirect('/customer_comments');
      }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    return loadCommentsAndRender(req, res, "Something went wrong. Please try again.");
  }
});

/* PAGE ROUTES */
router.get('/menu', (req, res) => {
  res.render('menu');
});

router.get('/about_us', (req, res) => {
  res.render('about_us');
});

// Helper Function: used to convert timestamps into "time ago" text
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}

/* Assistance from Copilot was used */ 
/* GET customer comments page */
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
          title: 'Downtown Donuts',
          comments,
          limit,
          totalComments
        });
      }
    );
  });
});

/* GET landing page*/
router.get('/landing_page', (req, res) => {
  res.render('landing_page', { title: 'Downtown Donuts' });
});

module.exports = router;
