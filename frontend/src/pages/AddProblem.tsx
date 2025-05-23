import {
  BookOpen,
  CheckCircle2,
  Code2,
  Download,
  FileText,
  Lightbulb,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Editor from "@monaco-editor/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProblemSchema, Difficulty } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/api/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

type testCase = {
  input: string;
  output: string;
};

type Language = "JAVASCRIPT" | "PYTHON" | "JAVA" | string;

type CodeSnippets = Record<Language, string>;
type ReferenceSolutions = Record<Language, string>;

type Example = {
  input: string;
  output: string;
  explanation: string;
};

type Examples = Record<Language, Example>;

export interface Problem {
  title: string;
  description: string;
  constraints: string;
  testcases: testCase[];
  codeSnippets: CodeSnippets;
  referenceSolution: ReferenceSolutions;
  hints?: string;
  editorial?: string;
  category?: string;
  tags: string[];
  examples: Examples;
  difficulty: Difficulty;
}

const sampledpData: Problem = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY" as Difficulty,
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolution: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};
const sampleStringProblem = {
  title: "Anagram Check",
  description:
    "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  difficulty: "MEDIUM" as Difficulty,
  tags: ["String", "Hash Table", "Sorting"],
  constraints:
    "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
  hints:
    "Try counting the frequency of each character in both strings and compare them.",
  editorial:
    "Sort both strings and compare, or use a hash map to count the frequency of each character in both strings and check for equality.",
  testcases: [
    {
      input: "s = 'anagram', t = 'nagaram'",
      output: "true",
    },
    {
      input: "s = 'rat', t = 'car'",
      output: "false",
    },
    {
      input: "s = 'a', t = 'a'",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "s = 'anagram', t = 'nagaram'",
      output: "true",
      explanation:
        "'anagram' and 'nagaram' contain the same characters with the same frequencies.",
    },
    PYTHON: {
      input: "s = 'anagram', t = 'nagaram'",
      output: "true",
      explanation:
        "'anagram' and 'nagaram' contain the same characters with the same frequencies.",
    },
    JAVA: {
      input: "s = 'anagram', t = 'nagaram'",
      output: "true",
      explanation:
        "'anagram' and 'nagaram' contain the same characters with the same frequencies.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputs = [];
rl.on('line', (line) => {
  inputs.push(line);
  if (inputs.length === 2) {
    const result = isAnagram(inputs[0], inputs[1]);
    console.log(result ? "true" : "false");
    rl.close();
  }
});`,
    PYTHON: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    t = sys.stdin.readline().strip()

    sol = Solution()
    result = sol.isAnagram(s, t)
    print(str(result).lower())`,
    JAVA: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static boolean isAnagram(String s, String t) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        String t = sc.nextLine();

        boolean result = isAnagram(s, t);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolution: {
    JAVASCRIPT: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}`,
    PYTHON: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)`,
    JAVA: `import java.util.Arrays;

public class Main {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        char[] sArr = s.toCharArray();
        char[] tArr = t.toCharArray();
        Arrays.sort(sArr);
        Arrays.sort(tArr);
        return Arrays.equals(sArr, tArr);
    }
}`,
  },
};

// const sampleStringProblem = {
//   title: "Valid Palindrome",
//   description:
//     "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
//   difficulty: "MEDIUM" as Difficulty,
//   tags: ["String", "Two Pointers", "Memoization"],
//   constraints:
//     "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
//   hints:
//     "Consider using two pointers, one from the start and one from the end, moving towards the center.",
//   editorial:
//     "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
//   testcases: [
//     {
//       input: "A man, a plan, a canal: Panama",
//       output: "true",
//     },
//     {
//       input: "race a car",
//       output: "false",
//     },
//     {
//       input: " ",
//       output: "true",
//     },
//   ],
//   examples: {
//     JAVASCRIPT: {
//       input: 's = "A man, a plan, a canal: Panama"',
//       output: "true",
//       explanation: '"amanaplanacanalpanama" is a palindrome.',
//     },
//     PYTHON: {
//       input: 's = "A man, a plan, a canal: Panama"',
//       output: "true",
//       explanation: '"amanaplanacanalpanama" is a palindrome.',
//     },
//     JAVA: {
//       input: 's = "A man, a plan, a canal: Panama"',
//       output: "true",
//       explanation: '"amanaplanacanalpanama" is a palindrome.',
//     },
//   },
//   codeSnippets: {
//     JAVASCRIPT: `/**
//    * @param {string} s
//    * @return {boolean}
//    */
//   function isPalindrome(s) {
//     // Write your code here
//   }

//   // Add readline for dynamic input handling
//   const readline = require('readline');
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
//   });

//   // Process input line
//   rl.on('line', (line) => {
//     // Call solution with the input string
//     const result = isPalindrome(line);

//     // Output the result
//     console.log(result ? "true" : "false");
//     rl.close();
//   });`,
//     PYTHON: `class Solution:
//       def isPalindrome(self, s: str) -> bool:
//           # Write your code here
//           pass

//   # Input parsing
//   if __name__ == "__main__":
//       import sys
//       # Read the input string
//       s = sys.stdin.readline().strip()

//       # Call solution
//       sol = Solution()
//       result = sol.isPalindrome(s)

//       # Output result
//       print(str(result).lower())  # Convert True/False to lowercase true/false`,
//     JAVA: `import java.util.Scanner;

// public class Main {
//     public static String preprocess(String s) {
//         return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
//     }

//     public static boolean isPalindrome(String s) {

//     }

//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         String input = sc.nextLine();

//         boolean result = isPalindrome(input);
//         System.out.println(result ? "true" : "false");
//     }
// }
// `,
//   },
//   referenceSolution: {
//     JAVASCRIPT: `/**
//    * @param {string} s
//    * @return {boolean}
//    */
//   function isPalindrome(s) {
//     // Convert to lowercase and remove non-alphanumeric characters
//     s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

//     // Check if it's a palindrome
//     let left = 0;
//     let right = s.length - 1;

//     while (left < right) {
//       if (s[left] !== s[right]) {
//         return false;
//       }
//       left++;
//       right--;
//     }

//     return true;
//   }

//   // Add readline for dynamic input handling
//   const readline = require('readline');
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
//   });

//   // Process input line
//   rl.on('line', (line) => {
//     // Call solution with the input string
//     const result = isPalindrome(line);

//     // Output the result
//     console.log(result ? "true" : "false");
//     rl.close();
//   });`,
//     PYTHON: `class Solution:
//       def isPalindrome(self, s: str) -> bool:
//           # Convert to lowercase and keep only alphanumeric characters
//           filtered_chars = [c.lower() for c in s if c.isalnum()]

//           # Check if it's a palindrome
//           return filtered_chars == filtered_chars[::-1]

//   # Input parsing
//   if __name__ == "__main__":
//       import sys
//       # Read the input string
//       s = sys.stdin.readline().strip()

//       # Call solution
//       sol = Solution()
//       result = sol.isPalindrome(s)

//       # Output result
//       print(str(result).lower())  # Convert True/False to lowercase true/false`,
//     JAVA: `import java.util.Scanner;

// public class Main {
//     public static String preprocess(String s) {
//         return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
//     }

//     public static boolean isPalindrome(String s) {
//         s = preprocess(s);
//         int left = 0, right = s.length() - 1;

//         while (left < right) {
//             if (s.charAt(left) != s.charAt(right)) return false;
//             left++;
//             right--;
//         }

//         return true;
//     }

//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         String input = sc.nextLine();

//         boolean result = isPalindrome(input);
//         System.out.println(result ? "true" : "false");
//     }
// }
// `,
//   },
// };

function AddProblem() {
  const [isLoading, setIsLoading] = useState(false);
  const [sampleType, setSampleType] = useState("array");
  const navigate = useNavigate({ from: "/addproblem" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<Problem>({
    resolver: zodResolver(addProblemSchema),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolution: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const onSubmit = async (data: Problem) => {
    try {
      setIsLoading(true);
      const res = await api.post("/problems/", data);

      toast.success(res.data.message || "Problem is created");

      navigate({ to: "/dashboard" });
    } catch (error) {
      console.log(error);
      let message = "Something went wrong";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const tags = watch("tags") || [];

  const loadSampleData = () => {
    const sampleData =
      sampleType === "array" ? sampledpData : sampleStringProblem;

    // Replace the tags and test cases arrays
    // replaceTags(sampleData.tags.map((tag) => tag));
    replaceTestCases(sampleData.testcases.map((tc) => tc));

    // Reset the form with sample data
    reset(sampleData);
  };

  const mainBackgroundColor = "bg-gray-300 dark:bg-zinc-800";
  const submainBackgroundColor = "bg-gray-200 dark:bg-zinc-700";
  const textviewBackgroundColor = "dark:bg-[#1e1e1e] text-white";

  return (
    <>
      <div className="hidden md:block container mx-auto py-8 ">
        <div className="card bg-background/50 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
              <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3 text-foreground">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                Create Problem
              </h2>

              <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 items-center">
                <div className="join">
                  <Select
                    onValueChange={(value) => {
                      setSampleType(value);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Sample Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Samples</SelectLabel>
                        <SelectItem value="array">DP Problem</SelectItem>
                        <SelectItem value="string">String Problem</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className=" bg-brand hover:bg-brand/80 text-white gap-2"
                  onClick={() => {
                    loadSampleData();
                  }}
                >
                  <Download className="w-4 h-4" />
                  Load Sample
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base md:text-lg font-semibold">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "input input-bordered w-full text-base md:text-lg",
                      mainBackgroundColor
                    )}
                    {...register("title")}
                    placeholder="Enter problem title"
                  />
                  {errors.title && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.title.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base md:text-lg font-semibold">
                      Description
                    </span>
                  </label>
                  <textarea
                    className={cn(
                      "textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y ",
                      mainBackgroundColor
                    )}
                    {...register("description")}
                    placeholder="Enter problem description"
                  />
                  {errors.description && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.description.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* tags */}

              <div
                className={cn(
                  "card p-4 md:p-6 shadow-md bg-gray-300 dark:bg-zinc-800",
                  mainBackgroundColor
                )}
              >
                <Controller
                  control={control}
                  name="tags"
                  render={({ field: { value, onChange } }) => (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          Tags
                        </h3>

                        <Button
                          type="button"
                          className="bg-brand hover:bg-brand/80 btn-sm text-white"
                          onClick={() => onChange([...value, ""])}
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add Tags
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {value.map((tag, index) => (
                          <div
                            key={index}
                            className="flex gap-2 items-center flex-wrap "
                          >
                            <input
                              value={tag}
                              {...register(`tags.${index}`)}
                              className={cn(
                                "input input-bordered ",
                                textviewBackgroundColor
                              )}
                              placeholder="Enter tag"
                              onChange={(e) => {
                                const newTags = [...value];
                                newTags[index] = e.target.value;
                                onChange(newTags);
                              }}
                            />

                            <button
                              type="button"
                              disabled={tags.length === 1}
                              className="btn btn-ghost btn-square btn-sm"
                              onClick={() => {
                                const newTags = value.filter(
                                  (_, i) => i !== index
                                );
                                onChange(newTags);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-error" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
                {errors.tags && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.tags.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Test Cases */}
              <div
                className={cn(
                  "card  p-4 md:p-6 shadow-md ",
                  mainBackgroundColor
                )}
              >
                <div className="flex items-center justify-between mb-6 ">
                  <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Test Cases
                  </h3>
                  <Button
                    className="bg-brand hover:bg-brand/80 btn-sm text-white"
                    onClick={() => appendTestCase({ input: "", output: "" })}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Test Case
                  </Button>
                </div>
                <div className="space-y-6">
                  {testCaseFields.map((field, index) => (
                    <div
                      key={field.id}
                      className={cn("card  shadow-md", submainBackgroundColor)}
                    >
                      <div className="card-body p-4 md:p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-base md:text-lg font-semibold">
                            Test Case #{index + 1}
                          </h4>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() => removeTestCase(index)}
                            disabled={testCaseFields.length === 1}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Input
                              </span>
                            </label>
                            <textarea
                              className={cn(
                                "textarea textarea-bordered h-auto w-full p-3 resize-y",
                                textviewBackgroundColor
                              )}
                              {...register(`testcases.${index}.input`)}
                              placeholder="Enter test case input"
                            />
                            {errors.testcases?.[index]?.input && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testcases[index].input.message}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Expected Output
                              </span>
                            </label>
                            <textarea
                              className={cn(
                                "textarea textarea-bordered h-auto w-full p-3 resize-y",
                                textviewBackgroundColor
                              )}
                              {...register(`testcases.${index}.output`)}
                              placeholder="Enter expected output"
                            />
                            {errors.testcases?.[index]?.output && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testcases[index].output.message}
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.testcases && !Array.isArray(errors.testcases) && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.testcases.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Code Editor Sections */}
              <div className="space-y-8">
                {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
                  <div
                    key={language}
                    className={cn(
                      "card p-4 md:p-6 shadow-md",
                      mainBackgroundColor
                    )}
                  >
                    <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      {language}
                    </h3>

                    <div className="space-y-6">
                      {/* Starter Code */}
                      <div
                        className={cn(
                          "card bg-base-100 shadow-md",
                          submainBackgroundColor
                        )}
                      >
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4">
                            Starter Code Template
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`codeSnippets.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  className={cn(textviewBackgroundColor)}
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                  }}
                                />
                              )}
                            />
                          </div>
                          {errors.codeSnippets?.[language] && (
                            <div className="mt-2">
                              <span className="text-error text-sm">
                                {errors.codeSnippets[language].message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reference Solution */}
                      <div
                        className={cn(
                          "card bg-base-100 shadow-md",
                          submainBackgroundColor
                        )}
                      >
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            Reference Solution
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`referenceSolution.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                  }}
                                />
                              )}
                            />
                          </div>
                          {errors.referenceSolution?.[language] && (
                            <div className="mt-2">
                              <span className="text-error text-sm">
                                {errors.referenceSolution[language].message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Examples */}
                      <div
                        className={cn(
                          "card bg-base-100 shadow-md",
                          submainBackgroundColor
                        )}
                      >
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4">
                            Example
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Input
                                </span>
                              </label>
                              <textarea
                                className={cn(
                                  "textarea textarea-bordered min-h-20 w-full p-3 resize-y",
                                  textviewBackgroundColor
                                )}
                                {...register(`examples.${language}.input`)}
                                placeholder="Example input"
                              />
                              {errors.examples?.[language]?.input && (
                                <label className="label">
                                  <span className="label-text-alt text-error">
                                    {errors.examples[language].input.message}
                                  </span>
                                </label>
                              )}
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Output
                                </span>
                              </label>
                              <textarea
                                className={cn(
                                  "textarea textarea-bordered min-h-20 w-full p-3 resize-y",
                                  textviewBackgroundColor
                                )}
                                {...register(`examples.${language}.output`)}
                                placeholder="Example output"
                              />
                              {errors.examples?.[language]?.output && (
                                <label className="label">
                                  <span className="label-text-alt text-error">
                                    {errors.examples[language].output.message}
                                  </span>
                                </label>
                              )}
                            </div>
                            <div className="form-control md:col-span-2">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Explanation
                                </span>
                              </label>
                              <textarea
                                className={cn(
                                  "textarea textarea-bordered min-h-24 w-full p-3 resize-y",
                                  textviewBackgroundColor
                                )}
                                {...register(
                                  `examples.${language}.explanation`
                                )}
                                placeholder="Explain the example"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Information */}
              <div
                className={cn(
                  "card bg-base-200 p-4 md:p-6 shadow-md",
                  mainBackgroundColor
                )}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Additional Information
                </h3>
                <div className="space-y-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Difficulty</span>
                    </label>
                    <select
                      className={cn(
                        "select select-bordered w-full text-base md:text-lg",
                        textviewBackgroundColor
                      )}
                      {...register("difficulty")}
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                    {errors.difficulty && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.difficulty.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Constraints
                      </span>
                    </label>
                    <textarea
                      className={cn(
                        "textarea textarea-bordered min-h-24 w-full p-3 resize-y",
                        textviewBackgroundColor
                      )}
                      {...register("constraints")}
                      placeholder="Enter problem constraints"
                    />
                    {errors.constraints && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.constraints.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Hints (Optional)
                      </span>
                    </label>
                    <textarea
                      className={cn(
                        "textarea textarea-bordered min-h-24 w-full p-3 resize-y",
                        textviewBackgroundColor
                      )}
                      {...register("hints")}
                      placeholder="Enter hints for solving the problem"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Editorial (Optional)
                      </span>
                    </label>
                    <textarea
                      className={cn(
                        "textarea textarea-bordered min-h-32 w-full p-3 resize-y",
                        textviewBackgroundColor
                      )}
                      {...register("editorial")}
                      placeholder="Enter problem editorial/solution explanation"
                    />
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end pt-4 border-t">
                <Button className="bg-brand hover:bg-brand/80 text-white btn-lg gap-2">
                  {isLoading ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Create Problem
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="md:hidden container mx-auto bg-background/50 h-screen flex items-center justify-center text-2xl font-extrabold">
        Not available for small screen
      </div>
    </>
  );
}

export default AddProblem;
