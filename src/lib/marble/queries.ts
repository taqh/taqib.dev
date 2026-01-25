import { marble } from "./client";

export async function fetchPosts() {
  try {
    const response = await marble.posts.list();
    const allPosts = [];

    for await (const page of response) {
      if (page.result.posts) {
        allPosts.push(...page.result.posts);
      }
    }

    return { posts: allPosts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [] };
  }
}

export async function fetchCategories() {
  try {
    const response = await marble.categories.list();
    const allCategories = [];

    for await (const page of response) {
      if (page.result.categories) {
        allCategories.push(...page.result.categories);
      }
    }

    return { categories: allCategories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [] };
  }
}

export async function fetchTags() {
  try {
    const response = await marble.tags.list();
    const allTags = [];

    for await (const page of response) {
      if (page.result.tags) {
        allTags.push(...page.result.tags);
      }
    }

    return { tags: allTags };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { tags: [] };
  }
}
