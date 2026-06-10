import type { RoadmapItem } from "../types";

const link = { label: "Practice placeholder", url: "https://leetcode.com/problemset/" };

export const roadmapItems: RoadmapItem[] = [
  { id: "r1", title: "Two Prices Make Budget", patternId: "arrays-hashmap", difficulty: "Easy", summary: "Find two entries that exactly match a budget target.", externalLinks: [link] },
  { id: "r2", title: "Repeated Badge ID", patternId: "arrays-hashmap", difficulty: "Easy", summary: "Detect if any badge ID appears more than once.", externalLinks: [link] },
  { id: "r3", title: "Grouped Anagrams", patternId: "arrays-hashmap", difficulty: "Medium", summary: "Group words that share the same character counts.", externalLinks: [link] },
  { id: "r4", title: "Mirror Phrase", patternId: "two-pointers", difficulty: "Easy", summary: "Validate a phrase as a palindrome under cleanup rules.", externalLinks: [link] },
  { id: "r5", title: "Sorted Pair Difference", patternId: "two-pointers", difficulty: "Medium", summary: "Find a pair in sorted numbers with a requested difference.", externalLinks: [link] },
  { id: "r6", title: "Compact Archive", patternId: "two-pointers", difficulty: "Easy", summary: "Move retained values forward in-place and return the kept length.", externalLinks: [link] },
  { id: "r7", title: "Longest Unique Window", patternId: "sliding-window", difficulty: "Medium", summary: "Find the longest substring with no repeated character.", externalLinks: [link] },
  { id: "r8", title: "At Most K Categories", patternId: "sliding-window", difficulty: "Medium", summary: "Find the longest segment with at most k distinct categories.", externalLinks: [link] },
  { id: "r9", title: "Shortest Required Cover", patternId: "sliding-window", difficulty: "Hard", summary: "Find the smallest window containing every required token.", externalLinks: [link] },
  { id: "r10", title: "Balanced Delimiters", patternId: "stack", difficulty: "Easy", summary: "Validate nested delimiter pairs.", externalLinks: [link] },
  { id: "r11", title: "Next Better Reading", patternId: "stack", difficulty: "Medium", summary: "For each reading, find the next reading that is greater.", externalLinks: [link] },
  { id: "r12", title: "Insert in Sorted Log", patternId: "binary-search", difficulty: "Easy", summary: "Find where a value should be inserted in sorted order.", externalLinks: [link] },
  { id: "r13", title: "Minimum Shipping Capacity", patternId: "binary-search", difficulty: "Medium", summary: "Find the smallest capacity that completes shipments in time.", externalLinks: [link] },
  { id: "r14", title: "Merge Two Chains", patternId: "linked-list", difficulty: "Easy", summary: "Merge two sorted node chains by changing links.", externalLinks: [link] },
  { id: "r15", title: "Cycle in Chain", patternId: "linked-list", difficulty: "Easy", summary: "Detect whether following next pointers eventually loops.", externalLinks: [link] },
  { id: "r16", title: "Tree Depth", patternId: "trees", difficulty: "Easy", summary: "Compute the maximum depth of a binary tree.", externalLinks: [link] },
  { id: "r17", title: "Lowest Shared Manager", patternId: "trees", difficulty: "Medium", summary: "Find the lowest node that has two targets in its subtrees.", externalLinks: [link] },
  { id: "r18", title: "Connected Rooms", patternId: "graphs", difficulty: "Medium", summary: "Count connected regions in a room map.", externalLinks: [link] },
  { id: "r19", title: "Course Completion", patternId: "graphs", difficulty: "Medium", summary: "Detect whether prerequisites contain a cycle.", externalLinks: [link] },
  { id: "r20", title: "Coin Change Minimum", patternId: "dynamic-programming", difficulty: "Medium", summary: "Find the fewest coins needed to form an amount.", externalLinks: [link] },
  { id: "r21", title: "House Selection", patternId: "dynamic-programming", difficulty: "Medium", summary: "Maximize score when adjacent choices cannot both be taken.", externalLinks: [link] },
];
