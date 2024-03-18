// Create web server
// Import express
const express = require('express');
// Import router
const router = express.Router();
// Import path
const path = require('path');
// Import body-parser
const bodyParser = require('body-parser');
// Import fs
const fs = require('fs');
// Import uuid
const uuid = require('uuid');
// Import multer
const multer = require('multer');
// Import upload
const upload = multer({dest: 'uploads/'});
// Import comments.json
const comments = require('../data/comments.json');

// Set up body-parser
router.use(bodyParser.json());

// Get /comments
router.get('/', (req, res) => {
    res.status(200).json(comments);
});

// Post /comments
router.post('/', (req, res) => {
    const newComment = {
        id: uuid.v4(),
        ...req.body
    };

    comments.push(newComment);
    fs.writeFile(path.join(__dirname, '../data/comments.json'), JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(newComment);
        }
    });
});

// Delete /comments/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === id);

    if (index === -1) {
        res.status(404).send('Comment not found');
    } else {
        comments.splice(index, 1);
        fs.writeFile(path.join(__dirname, '../data/comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(comments);
            }
        });
    }
});

// Export router
module.exports = router;