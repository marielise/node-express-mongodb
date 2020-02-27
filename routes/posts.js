const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('This is a Get');
  Post.find({}, (err, data) => {
    res.json(data);
  });
});

router.get('/:id', (req, res) => {
  console.log(`This is a get with id ${req.params.id}`);
  Post.findById(req.params.id, (err, data) => {
    if (err) {
    } else {
      res.json(data);
    }
  });
});

router.post('/', async (req, res) => {
  console.log('This is a post');
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }

  /*post.save().then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });*/
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
