import type { Visualizer } from "../types";

export const visualizers: Visualizer[] = [
  {
    id: "two-sum-hashmap",
    title: "Two Sum using HashMap",
    patternId: "arrays-hashmap",
    description: "Watch complements enter and leave the decision process.",
    code: [
      "Map<Integer, Integer> seen = new HashMap<>();",
      "for (int i = 0; i < nums.length; i++) {",
      "    int need = target - nums[i];",
      "    if (seen.containsKey(need)) return new int[] { seen.get(need), i };",
      "    seen.put(nums[i], i);",
      "}",
    ],
    steps: [
      { line: 1, explanation: "Start with an empty map from value to index.", variables: { nums: "[2, 7, 11]", target: 9 }, structures: { seen: [] } },
      { line: 3, explanation: "At i = 0, value 2 needs complement 7.", variables: { i: 0, value: 2, need: 7 }, structures: { seen: [] } },
      { line: 5, explanation: "7 is not stored yet, so remember 2 at index 0.", variables: { i: 0 }, structures: { seen: ["2 -> 0"] } },
      { line: 3, explanation: "At i = 1, value 7 needs complement 2.", variables: { i: 1, value: 7, need: 2 }, structures: { seen: ["2 -> 0"] } },
      { line: 4, explanation: "2 is already in the map, so the answer is indexes 0 and 1.", variables: { result: "[0, 1]" }, structures: { seen: ["2 -> 0"] } },
    ],
  },
  {
    id: "valid-parentheses-stack",
    title: "Valid Parentheses using Stack",
    patternId: "stack",
    description: "See how the most recent opener must match the next closer.",
    code: [
      "Deque<Character> stack = new ArrayDeque<>();",
      "for (char ch : s.toCharArray()) {",
      "    if (ch == '(' || ch == '[' || ch == '{') stack.push(ch);",
      "    else if (stack.isEmpty() || !matches(stack.pop(), ch)) return false;",
      "}",
      "return stack.isEmpty();",
    ],
    steps: [
      { line: 1, explanation: "Initialize an empty stack for unmatched openers.", variables: { s: "([])" }, structures: { stack: [] } },
      { line: 3, explanation: "Read '(' and push it because it needs a future ')'.", variables: { ch: "(" }, structures: { stack: ["("] } },
      { line: 3, explanation: "Read '[' and push it above '(' because it must close first.", variables: { ch: "[" }, structures: { stack: ["(", "["] } },
      { line: 4, explanation: "Read ']'. The top '[' matches, so pop it.", variables: { ch: "]" }, structures: { stack: ["("] } },
      { line: 4, explanation: "Read ')'. The top '(' matches, so pop it.", variables: { ch: ")" }, structures: { stack: [] } },
      { line: 6, explanation: "The stack is empty, meaning every opener was matched.", variables: { valid: true }, structures: { stack: [] } },
    ],
  },
  {
    id: "binary-search-pointers",
    title: "Binary Search with low/mid/high",
    patternId: "binary-search",
    description: "Track how boundaries eliminate half of a sorted array.",
    code: [
      "int lo = 0, hi = nums.length - 1;",
      "while (lo <= hi) {",
      "    int mid = lo + (hi - lo) / 2;",
      "    if (nums[mid] == target) return mid;",
      "    if (nums[mid] < target) lo = mid + 1;",
      "    else hi = mid - 1;",
      "}",
      "return -1;",
    ],
    steps: [
      { line: 1, explanation: "Search the entire sorted array.", variables: { nums: "[1, 3, 5, 8, 12, 15]", target: 12, lo: 0, hi: 5 }, structures: { array: ["1", "3", "5", "8", "12", "15"] } },
      { line: 3, explanation: "mid is 2, so compare nums[2] = 5.", variables: { lo: 0, mid: 2, hi: 5 }, structures: { pointers: ["lo -> 0", "mid -> 2", "hi -> 5"] } },
      { line: 5, explanation: "5 is too small, so discard indexes 0 through 2.", variables: { lo: 3, hi: 5 }, structures: { activeRange: ["8", "12", "15"] } },
      { line: 3, explanation: "mid is now 4, so compare nums[4] = 12.", variables: { lo: 3, mid: 4, hi: 5 }, structures: { pointers: ["lo -> 3", "mid -> 4", "hi -> 5"] } },
      { line: 4, explanation: "The target is found at index 4.", variables: { result: 4 }, structures: { activeRange: ["12"] } },
    ],
  },
];

export const visualizerById = Object.fromEntries(visualizers.map((item) => [item.id, item])) as Record<string, Visualizer>;
