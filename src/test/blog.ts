import chai, { expect } from "chai";
import { ethers } from "hardhat";
import { Blog } from "../../typechain";
import chaiAsPromised from "chai-as-promised";
import { BigNumber } from "ethers";
import crypto from "crypto";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(chaiAsPromised);

const deploy = async (name: string) => {
  const blogFactory = await ethers.getContractFactory("Blog");
  const blog = (await blogFactory.deploy(name)) as Blog;
  await blog.deployed();
  return blog;
};

describe("Blog", () => {
  describe("constructor", () => {
    it("should correctly initialize contract", async () => {
      // given
      const name = "My Blog";

      // when
      const blog = await deploy(name);

      // then
      await expect(blog.name()).to.eventually.equal(name);
    });
  });

  describe("updateBlogName", () => {
    it("should correctly update name", async () => {
      //given
      const ogName = "My Blog";
      const newName = "New Blog Name";

      // when
      const blog = await deploy(ogName);
      await blog.updateBlogName(newName);

      // then
      await expect(blog.name()).to.eventually.equal(newName);
    });

    it("should throw if not called by owner", async () => {
      //given
      const ogName = "My Blog";
      const newName = "New Blog Name";
      const malicious = (await ethers.getSigners())[1];

      // when
      const blog = await deploy(ogName);
      const updateBlogNamePromise = blog
        .connect(malicious)
        .updateBlogName(newName);

      // then
      await expect(updateBlogNamePromise).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("createPost", () => {
    it("should correctly create post", async () => {
      // given
      const name = "My Blog";
      const title = "My Post";
      const contentHash = crypto.randomBytes(256 / 8).toString("hex");
      const imageHash = crypto.randomBytes(256 / 8).toString("hex");
      const isPublished = Math.random() < 0.5;

      // when
      const blog = await deploy(name);
      const tx = await blog.createPost(
        title,
        contentHash,
        imageHash,
        isPublished
      );
      await tx.wait();
      const fetchPost = await blog.fetchPost(1);

      // then
      expect(fetchPost.id).to.equal(BigNumber.from(1));
      expect(fetchPost.title).to.equal(title);
      expect(fetchPost.contentHash).to.equal(contentHash);
      expect(fetchPost.imageHash).to.equal(imageHash);
      expect(fetchPost.isPublished).to.equal(isPublished);
    });
  });

  describe("updatePost", () => {
    it("should correctly update post", async () => {
      // given
      const author = (await ethers.getSigners())[1];
      const name = "My Blog";
      const title = { old: "My Post", new: "New Post" };
      const contentHash = {
        old: crypto.randomBytes(256 / 8).toString("hex"),
        new: crypto.randomBytes(256 / 8).toString("hex"),
      };
      const imageHash = {
        old: crypto.randomBytes(256 / 8).toString("hex"),
        new: crypto.randomBytes(256 / 8).toString("hex"),
      };
      const isPublished = {
        old: Math.random() < 0.5,
        new: Math.random() < 0.5,
      };

      // when
      const blog = await deploy(name);
      await blog
        .connect(author)
        .createPost(title.old, contentHash.old, imageHash.old, isPublished.old);
      await blog
        .connect(author)
        .updatePost(
          1,
          title.new,
          contentHash.new,
          imageHash.new,
          isPublished.new
        );
      const fetchPost = await blog.fetchPost(1);

      // then
      expect(fetchPost.id).to.equal(BigNumber.from(1));
      expect(fetchPost.title).to.equal(title.new);
      expect(fetchPost.contentHash).to.equal(contentHash.new);
      expect(fetchPost.imageHash).to.equal(imageHash.new);
      expect(fetchPost.isPublished).to.equal(isPublished.new);
      expect(fetchPost.author).to.equal(author.address);
    });

    it("should throw if not called by author", async () => {
      // given
      const author = (await ethers.getSigners())[1];
      const malicious = (await ethers.getSigners())[2];
      const name = "My Blog";
      const title = { old: "My Post", new: "New Post" };
      const contentHash = {
        old: crypto.randomBytes(256 / 8).toString("hex"),
        new: crypto.randomBytes(256 / 8).toString("hex"),
      };
      const imageHash = {
        old: crypto.randomBytes(256 / 8).toString("hex"),
        new: crypto.randomBytes(256 / 8).toString("hex"),
      };
      const isPublished = {
        old: Math.random() < 0.5,
        new: Math.random() < 0.5,
      };

      // when
      const blog = await deploy(name);
      await blog
        .connect(author)
        .createPost(title.old, contentHash.old, imageHash.old, isPublished.old);
      const updatePostPromise = blog
        .connect(malicious)
        .updatePost(
          1,
          title.new,
          contentHash.new,
          imageHash.new,
          isPublished.new
        );
      const fetchPost = await blog.fetchPost(1);

      // then
      await expect(updatePostPromise).to.be.revertedWith(
        "Only the author can update the post"
      );
      expect(fetchPost.id).to.equal(BigNumber.from(1));
      expect(fetchPost.title).to.equal(title.old);
      expect(fetchPost.contentHash).to.equal(contentHash.old);
      expect(fetchPost.imageHash).to.equal(imageHash.old);
      expect(fetchPost.isPublished).to.equal(isPublished.old);
      expect(fetchPost.author).to.equal(author.address);
    });
  });

  describe("banPost", () => {
    it("should unban post", async () => {
      // given
      const owner = (await ethers.getSigners())[0];
      const name = "My Blog";
      const title = "My Post";
      const contentHash = crypto.randomBytes(256 / 8).toString("hex");
      const imageHash = crypto.randomBytes(256 / 8).toString("hex");
      const isPublished = Math.random() < 0.5;

      // when
      const blog = await deploy(name);
      await blog.createPost(title, contentHash, imageHash, isPublished);
      await blog.banPost(1, true);
      await blog.banPost(1, false);
      const fetchPost = await blog.fetchPost(1);

      // then
      expect(fetchPost.id).to.equal(BigNumber.from(1));
      expect(fetchPost.title).to.equal(title);
      expect(fetchPost.contentHash).to.equal(contentHash);
      expect(fetchPost.imageHash).to.equal(imageHash);
      expect(fetchPost.isPublished).to.equal(isPublished);
      expect(fetchPost.author).to.equal(owner.address);
    });

    it("should revert in already banned post", async () => {
      // given
      const name = "My Blog";
      const title = "My Post";
      const contentHash = crypto.randomBytes(256 / 8).toString("hex");
      const imageHash = crypto.randomBytes(256 / 8).toString("hex");
      const isPublished = Math.random() < 0.5;
      const isBanned = true;

      // when
      const blog = await deploy(name);
      await blog.createPost(title, contentHash, imageHash, isPublished);
      await blog.banPost(1, isBanned);
      const banPostPromise = blog.banPost(1, isBanned);

      // then
      await expect(banPostPromise).to.be.revertedWith(
        "Post is already banned/not banned"
      );
    });

    it("should revert in already not banned post", async () => {
      // given
      const name = "My Blog";
      const title = "My Post";
      const contentHash = crypto.randomBytes(256 / 8).toString("hex");
      const imageHash = crypto.randomBytes(256 / 8).toString("hex");
      const isPublished = Math.random() < 0.5;
      const isBanned = false;

      // when
      const blog = await deploy(name);
      await blog.createPost(title, contentHash, imageHash, isPublished);
      const banPostPromise = blog.banPost(1, isBanned);

      // then
      await expect(banPostPromise).to.be.revertedWith(
        "Post is already banned/not banned"
      );
    });

    it("should revert if not called by owner", async () => {
      // given
      const name = "My Blog";
      const title = "My Post";
      const contentHash = crypto.randomBytes(256 / 8).toString("hex");
      const imageHash = crypto.randomBytes(256 / 8).toString("hex");
      const isPublished = Math.random() < 0.5;
      const isBanned = false;
      const malicious = (await ethers.getSigners())[1];

      // when
      const blog = await deploy(name);
      await blog.createPost(title, contentHash, imageHash, isPublished);
      const banPostPromise = blog.connect(malicious).banPost(1, isBanned);

      // then
      await expect(banPostPromise).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("fetchPost", () => {
    it("should correctly fetch post", async () => {
      // given
      const owner = (await ethers.getSigners())[0];
      const name = "My Blog";
      const title = "My Post";
      const contentHash = crypto.randomBytes(256 / 8).toString("hex");
      const imageHash = crypto.randomBytes(256 / 8).toString("hex");
      const isPublished = Math.random() < 0.5;

      // when
      const blog = await deploy(name);
      await blog.createPost(title, contentHash, imageHash, isPublished);
      const fetchPost = await blog.fetchPost(1);

      // then
      expect(fetchPost.id).to.equal(BigNumber.from(1));
      expect(fetchPost.title).to.equal(title);
      expect(fetchPost.contentHash).to.equal(contentHash);
      expect(fetchPost.imageHash).to.equal(imageHash);
      expect(fetchPost.isPublished).to.equal(isPublished);
      expect(fetchPost.author).to.equal(owner.address);
    });

    it("should revert on banned post", async () => {
      // given
      const name = "My Blog";
      const title = "My Post";
      const contentHash = crypto.randomBytes(256 / 8).toString("hex");
      const imageHash = crypto.randomBytes(256 / 8).toString("hex");
      const isPublished = Math.random() < 0.5;

      // when
      const blog = await deploy(name);
      await blog.createPost(title, contentHash, imageHash, isPublished);
      await blog.banPost(1, true);
      const fetchPostPromise = blog.fetchPost(1);

      // then
      await expect(fetchPostPromise).to.be.revertedWith("Post is banned");
    });
  });

  describe("fetchPosts", () => {
    it("should correctly fetch N created posts", async () => {
      // given
      const signers = await ethers.getSigners();
      const name = "My Blog";
      const numberOfPosts = Math.round(Math.random() * 80) + 20;
      const numberOfBannedPosts =
        Math.round(Math.random() * (numberOfPosts - 2)) + 1; //At least one and less than the total
      const posts = [] as {
        title: string;
        contentHash: string;
        imageHash: string;
        isPublished: boolean;
        author: SignerWithAddress;
      }[];
      const bannedPosts = [] as number[];
      for (let i = 0; i < numberOfPosts; i++) {
        posts.push({
          title: crypto.randomBytes(256 / 8).toString("hex"),
          contentHash: crypto.randomBytes(256 / 8).toString("hex"),
          imageHash: crypto.randomBytes(256 / 8).toString("hex"),
          isPublished: Math.random() < 0.5,
          author: signers[Math.floor(Math.random() * signers.length)],
        });
      }
      while (bannedPosts.length < numberOfBannedPosts) {
        const id = Math.floor(Math.random() * numberOfPosts) + 1;
        if (bannedPosts.indexOf(id) === -1) {
          bannedPosts.push(id);
        }
      }

      // when
      const blog = await deploy(name);
      for (let i = 0; i < numberOfPosts; i++) {
        await blog
          .connect(posts[i].author)
          .createPost(
            posts[i].title,
            posts[i].contentHash,
            posts[i].imageHash,
            posts[i].isPublished
          );
      }
      await Promise.all(
        bannedPosts.map(async (id) => {
          await blog.banPost(id, true);
        })
      );
      const fetchedPosts = await blog.fetchPosts();

      // then
      expect(fetchedPosts.length).to.equal(numberOfPosts - numberOfBannedPosts);
      for (let i = 0; i < fetchedPosts.length; i++) {
        const id = fetchedPosts[i].id.toNumber();
        expect(bannedPosts).to.not.include(id);
        expect(fetchedPosts[i].title).to.equal(posts[id - 1].title);
        expect(fetchedPosts[i].contentHash).to.equal(posts[id - 1].contentHash);
        expect(fetchedPosts[i].imageHash).to.equal(posts[id - 1].imageHash);
        expect(fetchedPosts[i].isPublished).to.equal(posts[id - 1].isPublished);
        expect(fetchedPosts[i].author).to.equal(posts[id - 1].author.address);
      }
    });
  });
});
