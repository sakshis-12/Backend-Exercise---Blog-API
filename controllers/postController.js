
const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel")

//@desc Get all posts
//@route GET /api/posts
//@access public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
})

//@desc Create new post
//@route POST /api/posts
//@access public
const createPost = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const {title, content, category_id} = req.body;
    if(!title || !content || !category_id) {
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }
    const post = await Post.create({
        title, 
        content,
        category_id,
    });
    res.status(201).json(post);
})
//@desc Get new post
//@route GET /api/posts/:id
//@access public
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
})

//@desc Update new post
//@route PUT /api/posts/:id
//@access public
const updatePost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    post.title = title;
    post.content = content;
    post.updated_at = new Date();
    const updatedPost = await post.save();
    // const updatedPost = await Post.findByIdAndUpdate(
    //     req.params.id,
    //     req.body,
    //     {new: true}
    //     );

    res.status(200).json(updatedPost);
})

//@desc Delete a post
//@route DELETE /api/posts/:id
//@access public
const deletePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    // await post.remove();
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json(post);
})

//@desc Get Latest post
//@route GET /api/posts/latest
//@access public

const getLatestPosts = asyncHandler(async (req, res) => {
    const latestPosts = await Post.aggregate([
      {
        $sort: {
          category_id: 1, 
          created_at: -1, 
        },
      },
      {
        $group: {
          _id: '$category_id',
          latestPost: { $first: '$$ROOT' }, 
        },
      },
    ]);
  
    if (!latestPosts || latestPosts.length === 0) {
      return res.status(404).json({ error: "No latest posts found" });
    }
  
    res.json(latestPosts);
  });

// const getPostCursor = async () => {
//     const cursor = await Post.aggregate([
//       {
//         $sort: {
//           category_id: 1,
//           created_at: -1,
//         },
//       },
//       {
//         $group: {
//           _id: '$category_id',
//           latestPost: { $first: '$$ROOT' },
//         },
//       },
//     ]).cursor();
  
//     return cursor;
//   };
  
//   const getLatestPosts = async () => {
//     const cursor = await getPostCursor();
//     const latestPosts = [];
  
//     while (await cursor.hasNext()) {
//       const post = await cursor.next();
//       latestPosts.push(post.latestPost);
//     }
  
//     return latestPosts;
//   };
  
  
  

// const getLatestPosts = asyncHandler(async (req, res) => {
//     const latestPosts = await Post.aggregate([
//       {
//         $group: {
//           _id: '$category_id',
//           latestPost: { $last: '$$ROOT' },
//         },
//       },
//     ]);
  
//     if (!latestPosts || latestPosts.length === 0) {
//       return res.status(404).json({ error: "No latest posts found" });
//     }
  
//     res.json(latestPosts);
//   });
  


module.exports = { getPosts, createPost, getPost, updatePost, deletePost, getLatestPosts };

