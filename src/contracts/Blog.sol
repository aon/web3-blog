//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Blog is Ownable {
  string public name;

  using Counters for Counters.Counter;
  Counters.Counter private _postIds;
  Counters.Counter private _bannedPosts;

  struct Post {
    uint256 id;
    string title;
    string contentHash;
    string imageHash;
    bool isPublished;
    address author;
  }
  mapping(uint256 => Post) private _idToPost;
  mapping(uint256 => bool) private _isPostBanned;

  event PostCreated(uint256 id);
  event PostUpdated(uint256 id);
  event PostBanned(uint256 id, bool isBanned);

  constructor(string memory _name) {
    console.log("Deploying Blog with name:", _name);
    name = _name;
  }

  function updateBlogName(string memory _name) public onlyOwner {
    name = _name;
  }

  function createPost(
    string memory _title,
    string memory _contentHash,
    string memory _imageHash,
    bool _isPublished
  ) public {
    _postIds.increment();
    uint256 postId = _postIds.current();
    Post storage post = _idToPost[postId];
    post.id = postId;
    post.title = _title;
    post.contentHash = _contentHash;
    post.imageHash = _imageHash;
    post.isPublished = _isPublished;
    post.author = msg.sender;
    emit PostCreated(postId);
  }

  function updatePost(
    uint256 _id,
    string memory _title,
    string memory _contentHash,
    string memory _imageHash,
    bool _isPublished
  ) public {
    Post storage post = _idToPost[_id];
    require(post.author == msg.sender, "Only the author can update the post");

    post.title = _title;
    post.contentHash = _contentHash;
    post.imageHash = _imageHash;
    post.isPublished = _isPublished;
    emit PostUpdated(post.id);
  }

  function banPost(uint256 _id, bool _isBanned) public onlyOwner {
    require(
      _isPostBanned[_id] != _isBanned,
      "Post is already banned/not banned"
    );
    if (_isBanned) {
      _bannedPosts.increment();
    } else {
      _bannedPosts.decrement();
    }
    _isPostBanned[_id] = _isBanned;
    emit PostBanned(_id, _isBanned);
  }

  function fetchPost(uint256 _id) public view returns (Post memory) {
    require(!_isPostBanned[_id], "Post is banned");
    return _idToPost[_id];
  }

  function fetchPosts() public view returns (Post[] memory) {
    uint256 numberOfPosts = _postIds.current();
    uint256 numberOfBannedPosts = _bannedPosts.current();
    Post[] memory posts = new Post[](numberOfPosts - numberOfBannedPosts);

    uint256 i = 0;
    uint256 postsIndex = 0;
    while (i < numberOfPosts) {
      if (_isPostBanned[i + 1]) {
        i++;
        continue;
      }
      posts[postsIndex] = _idToPost[i + 1];
      i++;
      postsIndex++;
    }
    return posts;
  }
}
