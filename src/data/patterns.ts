import type { Pattern } from "../types";

const practice = (label: string): { label: string; url: string } => ({
  label,
  url: "https://leetcode.com/problemset/",
});

export const patterns: Pattern[] = [
  {
    id: "arrays-hashmap",
    name: "Arrays & HashMap",
    shortName: "HashMap",
    difficulty: "Easy",
    summary: "Use indexing and key-value memory to turn repeated scans into direct lookups.",
    what: "This pattern stores facts you have already seen, such as a number's index, a frequency, or the first position of a prefix value. In Java, HashMap and HashSet are the usual tools.",
    when: ["You need fast membership checks.", "You need counts or frequencies.", "You need to remember an earlier position."],
    clues: ["contains duplicate", "pair sums to", "frequency", "first occurrence", "anagram"],
    javaTemplate: `Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
    int need = target - nums[i];
    if (seen.containsKey(need)) {
        return new int[] { seen.get(need), i };
    }
    seen.put(nums[i], i);
}`,
    mistakes: ["Forgetting that HashMap lookup is average O(1), not sorted order.", "Overwriting an index when the first occurrence matters.", "Using containsValue, which scans the map."],
    complexity: "Usually O(n) time and O(n) space. Watch for nested loops hidden inside map operations.",
    examples: [
      { title: "Pair with Target Sum", difficulty: "Easy", summary: "Find two different positions whose values add to a target.", links: [practice("External practice placeholder")] },
      { title: "First Repeating Value", difficulty: "Easy", summary: "Return the first value that appears more than once while scanning left to right.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    shortName: "Pointers",
    difficulty: "Easy",
    summary: "Move two indexes through a sequence to avoid unnecessary comparisons.",
    what: "Two pointers are useful when position relationships matter. The pointers may start at opposite ends, move at different speeds, or compact values in place.",
    when: ["The input is sorted.", "You need a pair or boundary.", "You can discard one side after each comparison."],
    clues: ["sorted array", "palindrome", "remove in-place", "closest pair", "left and right"],
    javaTemplate: `int left = 0;
int right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return true;
    if (sum < target) left++;
    else right--;
}`,
    mistakes: ["Using it on unsorted input without sorting or another invariant.", "Moving both pointers when only one side is logically eliminated.", "Forgetting that sorting changes original indexes."],
    complexity: "Often O(n) after any required sorting. If sorting is needed, total time becomes O(n log n).",
    examples: [
      { title: "Sorted Pair Match", difficulty: "Easy", summary: "Decide if a sorted list contains two values that combine to a target.", links: [practice("External practice placeholder")] },
      { title: "Compress Unique Values", difficulty: "Easy", summary: "Move unique values to the front of an array without creating another array.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    shortName: "Window",
    difficulty: "Medium",
    summary: "Track a moving range instead of recalculating every subarray or substring.",
    what: "A sliding window keeps a left and right boundary plus state about the current range. It shines when the answer is a contiguous segment.",
    when: ["The problem asks for a subarray or substring.", "You need longest, shortest, or count of ranges.", "The window can be updated when one item enters or leaves."],
    clues: ["contiguous", "substring", "subarray", "at most k", "longest without"],
    javaTemplate: `int left = 0;
Map<Character, Integer> freq = new HashMap<>();
for (int right = 0; right < s.length(); right++) {
    char in = s.charAt(right);
    freq.put(in, freq.getOrDefault(in, 0) + 1);
    while (windowIsInvalid(freq)) {
        char out = s.charAt(left++);
        freq.put(out, freq.get(out) - 1);
    }
    best = Math.max(best, right - left + 1);
}`,
    mistakes: ["Shrinking only once when the window may still be invalid.", "Mixing inclusive and exclusive window lengths.", "Using sliding window when the condition is not monotonic."],
    complexity: "Usually O(n) time because each boundary moves forward at most n times. Space depends on tracked counts.",
    examples: [
      { title: "Longest Calm Stretch", difficulty: "Medium", summary: "Find the longest segment with no more than k noisy readings.", links: [practice("External practice placeholder")] },
      { title: "Smallest Covering Segment", difficulty: "Hard", summary: "Find the shortest substring containing every required character.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "stack",
    name: "Stack",
    shortName: "Stack",
    difficulty: "Easy",
    summary: "Use last-in-first-out memory for nested structures and unresolved earlier items.",
    what: "A stack remembers the most recent thing that has not been matched, closed, or resolved. In Java, prefer ArrayDeque over the legacy Stack class.",
    when: ["You need to match opens with closes.", "You need previous greater/smaller values.", "You are simulating undo or nested parsing."],
    clues: ["parentheses", "next greater", "monotonic", "nested", "backtrack"],
    javaTemplate: `Deque<Character> stack = new ArrayDeque<>();
for (char ch : s.toCharArray()) {
    if (ch == '(') stack.push(ch);
    else if (ch == ')') {
        if (stack.isEmpty()) return false;
        stack.pop();
    }
}
return stack.isEmpty();`,
    mistakes: ["Using pop before checking isEmpty.", "Forgetting that push/pop operate at the same end.", "Storing values when indexes are needed for distances."],
    complexity: "Most stack scans are O(n) time and O(n) space in the worst case.",
    examples: [
      { title: "Balanced Brackets", difficulty: "Easy", summary: "Check whether every opener has the correct later closer.", links: [practice("External practice placeholder")] },
      { title: "Warmer Day Distance", difficulty: "Medium", summary: "For each day, find how long until a warmer reading appears.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    shortName: "Binary",
    difficulty: "Medium",
    summary: "Repeatedly cut a monotonic search space in half.",
    what: "Binary search is not only for arrays. It also works on answer ranges when you can ask a yes/no question that flips from false to true.",
    when: ["The input is sorted.", "A condition is monotonic.", "You need the first or last valid position."],
    clues: ["sorted", "minimum possible", "first true", "peak", "rotated"],
    javaTemplate: `int lo = 0;
int hi = nums.length - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1;`,
    mistakes: ["Using (lo + hi) / 2 where overflow is possible.", "Choosing <= vs < without matching updates.", "Returning mid when the problem asks for a boundary."],
    complexity: "O(log n) time for array search, often O(log range * checkCost) for answer search.",
    examples: [
      { title: "Find Insert Position", difficulty: "Easy", summary: "Return where a target belongs in sorted order.", links: [practice("External practice placeholder")] },
      { title: "Smallest Feasible Load", difficulty: "Medium", summary: "Find the smallest capacity that lets all work finish on time.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "linked-list",
    name: "Linked List",
    shortName: "List",
    difficulty: "Medium",
    summary: "Manipulate node references carefully, often with dummy nodes or fast/slow pointers.",
    what: "Linked list problems are about references, not indexes. Java solutions commonly use dummy heads to simplify edge cases.",
    when: ["You need to reverse, merge, split, or detect cycles.", "Random access would be expensive.", "Pointer updates are the core challenge."],
    clues: ["node", "next pointer", "cycle", "middle", "merge lists"],
    javaTemplate: `ListNode dummy = new ListNode(0);
ListNode tail = dummy;
while (a != null && b != null) {
    if (a.val <= b.val) {
        tail.next = a;
        a = a.next;
    } else {
        tail.next = b;
        b = b.next;
    }
    tail = tail.next;
}
tail.next = (a != null) ? a : b;
return dummy.next;`,
    mistakes: ["Losing the rest of the list before saving next.", "Not handling an empty head.", "Creating cycles accidentally when reusing nodes."],
    complexity: "Most pointer scans are O(n) time. Space is O(1) unless recursion or extra containers are used.",
    examples: [
      { title: "Merge Ordered Chains", difficulty: "Easy", summary: "Merge two sorted linked chains into one sorted chain.", links: [practice("External practice placeholder")] },
      { title: "Cycle Entrance", difficulty: "Medium", summary: "Detect whether a list loops and identify where the loop starts.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "trees",
    name: "Trees",
    shortName: "Trees",
    difficulty: "Medium",
    summary: "Use recursion, DFS, or BFS to reason from parent-child structure.",
    what: "Tree solutions usually define what each node contributes upward or what state must be carried downward.",
    when: ["The data has parent-child relationships.", "You need path, depth, ancestor, or subtree information.", "Recursive structure mirrors the problem."],
    clues: ["root", "leaf", "subtree", "height", "level order"],
    javaTemplate: `int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = dfs(node.left);
    int right = dfs(node.right);
    return 1 + Math.max(left, right);
}`,
    mistakes: ["Returning a global answer instead of a node contribution.", "Forgetting null base cases.", "Assuming a binary search tree when it is only a binary tree."],
    complexity: "Traversals are usually O(n) time. Recursion uses O(h) call stack, where h is tree height.",
    examples: [
      { title: "Tree Height", difficulty: "Easy", summary: "Find the number of nodes on the longest root-to-leaf path.", links: [practice("External practice placeholder")] },
      { title: "Best Path Through Tree", difficulty: "Hard", summary: "Compute the largest score of any path that may pass through a node.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "graphs",
    name: "Graphs",
    shortName: "Graphs",
    difficulty: "Medium",
    summary: "Model relationships as nodes and edges, then traverse with visited state.",
    what: "Graph problems are about reachability, components, ordering, or shortest paths. The first move is choosing adjacency representation and visited rules.",
    when: ["Objects connect in many-to-many ways.", "You need reachability, islands, dependencies, or shortest paths.", "Cycles are possible."],
    clues: ["network", "connected", "dependency", "grid neighbors", "minimum steps"],
    javaTemplate: `Queue<Integer> queue = new ArrayDeque<>();
boolean[] seen = new boolean[n];
queue.add(start);
seen[start] = true;
while (!queue.isEmpty()) {
    int node = queue.remove();
    for (int next : graph.get(node)) {
        if (!seen[next]) {
            seen[next] = true;
            queue.add(next);
        }
    }
}`,
    mistakes: ["Marking visited too late and enqueuing duplicates.", "Missing bounds checks in grid graphs.", "Using DFS recursion where input depth may overflow the stack."],
    complexity: "Adjacency-list traversal is O(V + E). Grid traversal is O(rows * cols).",
    examples: [
      { title: "Count Connected Groups", difficulty: "Medium", summary: "Count how many separate regions exist in a grid or network.", links: [practice("External practice placeholder")] },
      { title: "Course Ordering", difficulty: "Medium", summary: "Decide whether prerequisites can be completed without a dependency cycle.", links: [practice("External practice placeholder")] },
    ],
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    shortName: "DP",
    difficulty: "Hard",
    summary: "Break repeated subproblems into states and transitions.",
    what: "Dynamic programming stores answers to smaller decisions so larger decisions do not recompute them. The hard part is defining state clearly.",
    when: ["Choices repeat across overlapping subproblems.", "You need best count, min cost, or number of ways.", "A greedy local choice is not obviously safe."],
    clues: ["maximum profit", "minimum cost", "number of ways", "can form", "subsequence"],
    javaTemplate: `int[] dp = new int[n + 1];
dp[0] = 1;
for (int amount = 1; amount <= n; amount++) {
    for (int coin : coins) {
        if (amount >= coin) {
            dp[amount] += dp[amount - coin];
        }
    }
}`,
    mistakes: ["Starting with code before defining the state sentence.", "Mixing up combinations and permutations by loop order.", "Forgetting base cases that represent doing nothing."],
    complexity: "Depends on state count times transition cost, such as O(n), O(n*k), or O(rows*cols).",
    examples: [
      { title: "Fewest Steps to Score", difficulty: "Medium", summary: "Find the minimum moves needed to reach a target score from allowed moves.", links: [practice("External practice placeholder")] },
      { title: "Count Formation Ways", difficulty: "Medium", summary: "Count how many ways a target can be assembled from smaller pieces.", links: [practice("External practice placeholder")] },
    ],
  },
];

export const patternById = Object.fromEntries(patterns.map((pattern) => [pattern.id, pattern])) as Record<string, Pattern>;
