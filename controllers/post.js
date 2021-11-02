import mongoose from 'mongoose';
import { postMessage } from '../models/postMessage';

export const getPost = async (req, res) => {
  console.log('get');
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  console.log('create');

  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json(error);
  }
};
export const getPostiD = async (req, res) => {
  console.log('get specific');
  const ID = req.params.id;
  try {
    const postMessages = await postMessage.findById({ _id: ID });
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log('update');

  const { id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await postMessage.findByIdAndUpdate(
    id,
    { ...post, _id: id },
    { new: true },
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  console.log('delete');
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  try {
    const delePost = await postMessage.findByIdAndRemove(id);
    res.json({ message: 'has deleted', ...delePost }).status(200);
  } catch (error) {
    console.error(error);
    res.status(409).json(error);
  }
};

export const likePost = async (req, res) => {
  console.log('like');
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const post = await postMessage.findById(id);
    const updatePost = await postMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1, _id: id },
      { new: true },
    );

    res.json(updatePost).status(200);
  } catch (error) {
    console.error(error);
    res.status(409).json(error);
  }
};
